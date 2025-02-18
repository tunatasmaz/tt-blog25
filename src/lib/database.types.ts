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
          description: string
          cover_image: string | null
          content: string
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          description: string
          cover_image?: string | null
          content: string
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string
          cover_image?: string | null
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
