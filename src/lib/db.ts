import { supabase } from './supabase'
import { Article, Project, Book } from '@/types'

export async function getArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Article[]
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data as Article
}

export async function getAllArticleSlugs() {
  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true)

  if (error) throw error
  return data.map(article => article.slug)
}

export async function getProjects() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Project[]
}

export async function getBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Book[]
}

export async function getPoems() {
  const { data, error } = await supabase
    .from('poems')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching poems:', error)
    return []
  }

  return data
}
