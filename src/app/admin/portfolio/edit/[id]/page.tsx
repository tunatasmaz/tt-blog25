'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/upload'
import Image from 'next/image'

const Editor = dynamic(() => import('@/components/Editor'), {
  ssr: false,
})

interface PortfolioForm {
  title: string
  slug: string
  content: string
  description: string
  cover_image?: string
  gallery_images?: string[]
  video_url?: string
  published: boolean
}

export default function EditPortfolioPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<PortfolioForm>({
    title: '',
    slug: '',
    content: '',
    description: '',
    cover_image: '',
    gallery_images: [],
    video_url: '',
    published: false,
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
        return
      }

      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error loading portfolio:', error)
        router.push('/admin/portfolio')
        return
      }

      if (data) {
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          description: data.description || '',
          cover_image: data.cover_image || '',
          gallery_images: data.gallery_images || [],
          video_url: data.video_url || '',
          published: data.published || false,
        })
      }
    }

    checkSession()
  }, [id, router])

  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const publicUrl = await uploadImage(file)
      setForm({ ...form, cover_image: publicUrl })
      
    } catch (error: any) {
      console.error('Görsel yükleme hatası:', error)
      setError(error.message || 'Görsel yüklenirken bir hata oluştu')
    } finally {
      setUploading(false)
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const handleGalleryImagesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const uploadPromises = Array.from(event.target.files).map(file => uploadImage(file))
      const uploadedUrls = await Promise.all(uploadPromises)
      
      setForm(prev => ({
        ...prev,
        gallery_images: [...(prev.gallery_images || []), ...uploadedUrls]
      }))
      
    } catch (error: any) {
      console.error('Galeri görsel yükleme hatası:', error)
      setError(error.message || 'Görseller yüklenirken bir hata oluştu')
    } finally {
      setUploading(false)
      if (event.target) {
        event.target.value = ''
      }
    }
  }

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, i) => i !== index)
    }))
  }

  const handleContentChange = (newContent: string) => {
    setForm({ ...form, content: newContent })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const { error: updateError } = await supabase
        .from('portfolio')
        .update({
          title: form.title,
          slug: form.slug,
          content: form.content,
          description: form.description,
          cover_image: form.cover_image,
          gallery_images: form.gallery_images,
          video_url: form.video_url,
          published: form.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (updateError) throw updateError

      router.refresh()
      router.push('/admin/portfolio')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 px-4">Proje Düzenle</h1>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 mb-6 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Başlık
              </label>
              <input
                type="text"
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL Kısaltması
              </label>
              <input
                type="text"
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Açıklama
              </label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-gray-300"
              />
            </div>

            <div>
              <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Video URL
              </label>
              <input
                type="url"
                id="video_url"
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Yayınla</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kapak Görseli
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 focus:outline-none"
                >
                  {uploading ? 'Yükleniyor...' : 'Görsel Seç'}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCoverImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              {form.cover_image && (
                <div className="mt-4 aspect-video relative rounded-lg overflow-hidden border bg-gray-50">
                  <Image
                    src={form.cover_image}
                    alt={form.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Galeri Görselleri
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 focus:outline-none"
                >
                  {uploading ? 'Yükleniyor...' : 'Görsel(ler) Seç'}
                </button>
                <input
                  type="file"
                  ref={galleryInputRef}
                  onChange={handleGalleryImagesUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
              {form.gallery_images && form.gallery_images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {form.gallery_images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video relative rounded-lg overflow-hidden border bg-gray-50">
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                İçerik
              </label>
              <div className="mt-1 prose prose-sm dark:prose-invert max-w-none">
                <Editor
                  content={form.content}
                  onChange={handleContentChange}
                  placeholder="Proje detaylarını yazın..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:outline-none"
          >
            İptal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
