import { supabase } from './supabase'

export async function uploadImage(file: File) {
  try {
    if (!file) {
      throw new Error('Dosya seçilmedi')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('images')
      .upload(fileName, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(fileName)

    if (!data?.publicUrl) {
      throw new Error('Public URL alınamadı')
    }

    return data.publicUrl

  } catch (error: any) {
    console.error('Görsel yükleme hatası:', error)
    throw new Error(error.message || 'Görsel yüklenirken bir hata oluştu')
  }
}
