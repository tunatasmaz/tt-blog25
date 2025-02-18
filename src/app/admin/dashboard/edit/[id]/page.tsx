'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { uploadImage } from '@/lib/upload'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Editor from '@/components/Editor'
import Image from 'next/image'

interface ArticleForm {
  title: string
  slug: string
  content: string
  excerpt: string
  image_url?: string
  published: boolean
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image_url: '',
    published: false,
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
        .from('articles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error loading article:', error)
        router.push('/admin/dashboard')
        return
      }

      if (data) {
        setForm({
          title: data.title || '',
          slug: data.slug || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          image_url: data.image_url || '',
          published: data.published || false,
        })
      }
    }

    checkSession()
  }, [id, router])

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        return
      }

      const file = event.target.files[0]
      const publicUrl = await uploadImage(file)
      setForm({ ...form, image_url: publicUrl })
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('articles')
      .update({
        title: form.title,
        slug: form.slug,
        content: form.content,
        excerpt: form.excerpt,
        image_url: form.image_url,
        published: form.published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating article:', error)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Makale Düzenle</h1>
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
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Özet
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kapak Görseli
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
              value={form.image_url || ''}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="veya görsel URL'si girin"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          {form.image_url && (
            <div className="mt-4">
              <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={form.image_url}
                  alt="Görsel önizleme"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className={`px-4 py-2 rounded-md ${preview 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
          >
            {preview ? 'Düzenle' : 'Önizle'}
          </button>
        </div>

        {preview ? (
          <div className="space-y-8">
            {form.image_url && (
              <div className="aspect-video relative rounded-lg overflow-hidden border bg-gray-50">
                <Image
                  src={form.image_url}
                  alt={form.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none">
              <h1>{form.title}</h1>
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {form.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İçerik
            </label>
            <Editor
              content={form.content}
              onChange={(content) => setForm({ ...form, content })}
            />
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            İptal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  )
}
