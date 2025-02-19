export interface Article {
  id: string
  title: string
  content: string
  slug: string
  excerpt?: string
  published: boolean
  created_at: string
  updated_at: string
  image_url?: string
}

export interface Portfolio {
  id: string
  title: string
  slug: string
  description?: string
  content: string
  cover_image?: string
  published: boolean
  created_at: string
  updated_at: string
  gallery_images?: any
  video_url?: string
}

export interface Book {
  id: string
  title: string
  author: string
  created_at: string
}
