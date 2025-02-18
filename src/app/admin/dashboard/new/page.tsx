'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface ArticleForm {
  title: string
  slug: string
  content: string
  excerpt: string
  image_url?: string
  published: boolean
}

export default function NewArticlePage() {
  const router = useRouter()
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image_url: '',
    published: false,
  })
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { session } = await getSession()
      if (!session) {
        router.push('/admin/login')
      }
    }
    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase
      .from('articles')
      .insert([form])

    if (error) {
      console.error('Error creating article:', error)
    } else {
      router.push('/admin/dashboard')
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: generateSlug(title),
    })
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Yeni Makale</h1>
        <div className="space-x-4">
          <button
            onClick={() => setPreview(!preview)}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            {preview ? 'Düzenle' : 'Önizle'}
          </button>
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            İptal
          </button>
        </div>
      </div>

      {preview ? (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1>{form.title}</h1>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {form.content}
          </ReactMarkdown>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Başlık</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-800"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Özet</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-800"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-2">Resim URL</label>
            <input
              type="url"
              value={form.image_url || ''}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-2">İçerik (Markdown)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-800 font-mono"
              rows={20}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="mr-2"
            />
            <label>Yayınla</label>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Oluştur
          </button>
        </form>
      )}
    </div>
  )
}
