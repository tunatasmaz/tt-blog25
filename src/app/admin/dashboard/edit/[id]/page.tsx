'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/upload'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Article, Portfolio } from '@/types'
import Link from 'next/link'

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
})

type EditableItem = Article | Portfolio
type ItemType = 'articles' | 'portfolio'

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EditPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params?.id as string
  const type = searchParams.get('type') as ItemType || 'articles'
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<EditableItem>({
    id: '',
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    published: false,
    created_at: '',
    updated_at: ''
  })
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from(type)
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          console.log('Loaded article data:', data)
          setForm(data)
        }
      } catch (error) {
        console.error(`Error loading ${type}:`, error)
        alert('İçerik yüklenirken bir hata oluştu')
        router.push('/admin/dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [id, router, type])

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      if (data) {
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(data.path);
        
        if (type === 'portfolio') {
          setForm({ ...form, cover_image: publicUrl } as Portfolio)
        } else {
          setForm({ ...form, image_url: publicUrl } as Article)
        }
      }
    } catch (error) {
      console.error('Görsel yükleme hatası:', error);
      alert('Görsel yüklenirken bir hata oluştu');
    } finally {
      setUploading(false);
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type !== 'portfolio') return

    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const files = event.target.files
      const newGalleryImages = await Promise.all(Array.from(files).map(async (file) => {
        const publicUrl = await uploadImage(file)
        return publicUrl
      }))

      const portfolioForm = form as Portfolio
      setForm({
        ...form,
        gallery_images: [...(portfolioForm.gallery_images || []), ...newGalleryImages]
      } as Portfolio)
      
    } catch (error: any) {
      console.error('Görsel yükleme hatası:', error)
      alert(error.message || 'Görsel yüklenirken bir hata oluştu')
    } finally {
      setUploading(false)
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const handleContentChange = (newContent: string) => {
    setForm({ ...form, content: newContent })
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = generateSlug(title);
    setForm({ ...form, title, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { error } = await supabase
        .from(type)
        .update({
          ...form,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        console.error('Error updating item:', error)
        alert('Güncelleme sırasında bir hata oluştu')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.error('Error updating item:', error)
      alert('Güncelleme sırasında bir hata oluştu')
    }
  }

  const isPortfolio = type === 'portfolio'

  const removeImage = (image: string, index: number) => {
    const newImages = form.gallery_images.filter((_, i) => i !== index)
    setForm({ ...form, gallery_images: newImages })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8 space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{isPortfolio ? 'Portfolyo' : 'Makale'} Düzenle</h1>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="rounded border-gray-300 text-blue-600"
              />
              <span>Yayınla</span>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                className="w-full rounded-md border p-2"
                required
              />
            </div>

            {isPortfolio && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  value={(form as Portfolio).description || ''}
                  onChange={(e) => setForm({ ...form, description: e.target.value } as Portfolio)}
                  className="w-full rounded-md border p-2 min-h-[100px]"
                  placeholder="Portfolyo projesi hakkında kısa açıklama"
                />
              </div>
            )}

            {isPortfolio && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <input
                  type="text"
                  value={(form as Portfolio).video_url || ''}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value } as Portfolio)}
                  className="w-full rounded-md border p-2"
                  placeholder="YouTube veya Vimeo video URL'si"
                />
              </div>
            )}

            {isPortfolio ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kapak Görseli
                </label>
                <div className="flex items-center space-x-4">
                  {(form as Portfolio).cover_image && (
                    <Image
                      src={(form as Portfolio).cover_image}
                      alt="Kapak görseli"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Kapak Görseli Yükle
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Görsel
                </label>
                <div className="flex items-center space-x-4">
                  {(form as Article).image_url && (
                    <Image
                      src={(form as Article).image_url}
                      alt="Makale görseli"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Görsel Yükle
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {isPortfolio && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Galeri Görselleri
                </label>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => galleryInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Galeri Görseli Ekle
                  </button>
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                  
                  {/* Galeri görsellerini göster */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {((form as Portfolio).gallery_images || []).map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image}
                          alt={`Galeri görseli ${index + 1}`}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover w-full h-48"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newImages = [...((form as Portfolio).gallery_images || [])];
                            newImages.splice(index, 1);
                            setForm({ ...form, gallery_images: newImages } as Portfolio);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İçerik
              </label>
              <Editor
                content={form.content}
                onChange={(newContent) => setForm({ ...form, content: newContent })}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
