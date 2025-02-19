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

      loadPortfolio()
    }

    checkSession()
  }, [id, router])

  const loadPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          content: data.content,
          description: data.description,
          cover_image: data.cover_image,
          gallery_images: data.gallery_images,
          video_url: data.video_url,
          published: data.published,
        })
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase
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
        })
        .eq('id', id)

      if (error) throw error

      router.push('/admin/portfolio')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    try {
      setUploading(true)
      const file = e.target.files[0]
      const imageUrl = await uploadImage(file)
      
      setForm(prev => ({
        ...prev,
        cover_image: imageUrl
      }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    
    try {
      setUploading(true)
      const files = Array.from(e.target.files)
      const uploadPromises = files.map(file => uploadImage(file))
      const imageUrls = await Promise.all(uploadPromises)
      
      setForm(prev => ({
        ...prev,
        gallery_images: [...(prev.gallery_images || []), ...imageUrls]
      }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      gallery_images: prev.gallery_images?.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Proje Düzenle
        </h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Başlık
                </label>
                <input
                  type="text"
                  id="title"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  value={form.slug}
                  onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Açıklama
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Video URL
                </label>
                <input
                  type="text"
                  id="video_url"
                  value={form.video_url}
                  onChange={e => setForm(prev => ({ ...prev, video_url: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={e => setForm(prev => ({ ...prev, published: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Yayında
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Kapak Görseli
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md relative">
                  {form.cover_image ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={form.cover_image}
                        alt="Cover image"
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, cover_image: '' }))}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="flex flex-col items-center justify-center cursor-pointer w-full h-48"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Dosya seç
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Galeri Görselleri
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGalleryImageUpload}
                  ref={galleryInputRef}
                  multiple
                  className="hidden"
                />
                <div className="mt-1 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {form.gallery_images?.map((image, index) => (
                      <div key={index} className="relative aspect-video group">
                        <Image
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div 
                    className="flex flex-col items-center justify-center cursor-pointer py-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Dosya seç
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İçerik
            </label>
            <Editor
              content={form.content}
              onChange={content => setForm(prev => ({ ...prev, content }))}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/portfolio')}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {uploading ? 'Yükleniyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
