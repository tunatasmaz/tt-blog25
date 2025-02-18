export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      portfolio: {
        Row: {
          id: number
          title: string
          slug: string
          description: string
          content: string
          cover_image: string | null
          published: boolean
          created_at: string
          updated_at: string | null
          gallery_images: string[] | null
          video_url: string | null
        }
        Insert: {
          id?: number
          title: string
          slug: string
          description: string
          content: string
          cover_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string | null
          gallery_images?: string[] | null
          video_url?: string | null
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          description?: string
          content?: string
          cover_image?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string | null
          gallery_images?: string[] | null
          video_url?: string | null
        }
      }
    }
  }
}
