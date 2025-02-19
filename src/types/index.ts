export interface Article {
  id: string
  title: string
  slug: string
  content: string
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
  gallery_images?: string[]
  video_url?: string
}

export interface Book {
  id: string
  title: string
  author: string
  created_at: string
}

export interface Poem {
  id: string
  title: string
  content: string
  written_at: string
}
