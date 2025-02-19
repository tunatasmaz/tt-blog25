'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/upload'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Article, Portfolio } from '@/types'

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
})

type EditableItem = Article | Portfolio
type ItemType = 'articles' | 'portfolio'

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
    published: false,
    created_at: '',
    updated_at: ''
  })
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!id) return

    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }

      const { data, error } = await supabase
        .from(type)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(`Error loading ${type}:`, error)
        router.push('/admin/dashboard')
        return
      }

      if (data) {
        setForm(data)
      }
    }

    checkSession()
  }, [id, router, type])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const publicUrl = await uploadImage(file)
      
      if (type === 'portfolio') {
        setForm({ ...form, cover_image: publicUrl } as Portfolio)
      } else {
        setForm({ ...form, image_url: publicUrl } as Article)
      }
      
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
    const slug = title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isPortfolio ? 'Portfolyo' : 'Makale'} Düzenle</h1>
        <label className="flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Yayınla
          </span>
        </label>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm border p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Başlık
          </label>
          <input
            type="text"
            value={form.title}
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            required
          />
        </div>

        {isPortfolio ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Açıklama
            </label>
            <textarea
              value={(form as Portfolio).description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value } as Portfolio)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
              rows={3}
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Özet
            </label>
            <textarea
              value={(form as Article).excerpt || ''}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value } as Article)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
              rows={3}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isPortfolio ? 'Kapak Görseli' : 'Görsel'}
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={uploading}
            >
              {uploading ? 'Yükleniyor...' : 'Görsel Yükle'}
            </button>
            <input
              type="text"
              value={isPortfolio ? (form as Portfolio).cover_image || '' : (form as Article).image_url || ''}
              onChange={(e) => isPortfolio 
                ? setForm({ ...form, cover_image: e.target.value } as Portfolio)
                : setForm({ ...form, image_url: e.target.value } as Article)
              }
              placeholder="veya görsel URL'si girin"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {((isPortfolio && (form as Portfolio).cover_image) || (!isPortfolio && (form as Article).image_url)) && (
            <div className="mt-2">
              <Image
                src={isPortfolio ? (form as Portfolio).cover_image! : (form as Article).image_url!}
                alt="Görsel"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {isPortfolio && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Galeri Görselleri
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  disabled={uploading}
                >
                  {uploading ? 'Yükleniyor...' : 'Galeri Görseli Yükle'}
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryUpload}
                  className="hidden"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {((form as Portfolio).gallery_images || []).map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Galeri görseli ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const portfolioForm = form as Portfolio
                        const newGallery = [...(portfolioForm.gallery_images || [])];
                        newGallery.splice(index, 1);
                        setForm({ ...form, gallery_images: newGallery } as Portfolio);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Video URL
              </label>
              <input
                type="text"
                value={(form as Portfolio).video_url || ''}
                onChange={(e) => setForm({ ...form, video_url: e.target.value } as Portfolio)}
                placeholder="YouTube veya Vimeo video URL'si"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            İçerik
          </label>
          <Editor
            value={form.content}
            onChange={handleContentChange}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
