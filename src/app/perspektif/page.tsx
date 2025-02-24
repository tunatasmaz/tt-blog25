'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Photo {
  id: string
  urls: {
    regular: string
    small: string
  }
  alt_description: string
}

export default function PerspektifPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
        console.log('Using API Key:', accessKey)

        // Önce public endpoint'i deneyelim
        const response = await fetch('https://api.unsplash.com/photos?per_page=30', {
          headers: {
            'Authorization': `Client-ID ${accessKey}`,
            'Accept-Version': 'v1'
          }
        })
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('API Error:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`)
        }
        
        const data = await response.json()
        console.log('API Response:', data)
        
        if (!Array.isArray(data)) {
          throw new Error('API yanıtı bir dizi değil')
        }
        
        setPhotos(data)
        setError(null)
      } catch (error) {
        console.error('Fotoğraflar yüklenirken hata oluştu:', error)
        setError(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">Perspektif</h1>
        <div className="text-center">Fotoğraflar yükleniyor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">Perspektif</h1>
        <div className="text-center text-red-500">Hata: {error}</div>
      </div>
    )
  }

  const columns = [[], [], []] as Photo[][]
  photos.forEach((photo, index) => {
    columns[index % 3].push(photo)
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <section className="mb-8 sm:mb-12">
        <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">Perspektif</h1>
        <div className="leading-snug space-y-2 sm:space-y-3">
          <p className="text-gray-600 text-base sm:text-lg">
            Artık yeni bir tutkum var. Fotoğraf...
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Anı ölümsüzleştirmek ve bundan keyif almak müthiş bir his.
          </p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-[5px]">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2 sm:gap-[5px]">
            {column.map((photo) => (
              <div
                key={photo.id}
                className="relative cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={photo.urls.small}
                    alt={photo.alt_description || 'Fotoğraf'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={columnIndex === 0 && photos.indexOf(photo) < 2}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative w-full max-w-5xl h-auto">
            <Image
              src={selectedPhoto.urls.regular}
              alt={selectedPhoto.alt_description || 'Fotoğraf'}
              width={1920}
              height={1080}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  )
}
