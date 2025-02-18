import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Home | Personal Portfolio',
  description: 'Product Designer Portfolio and Blog',
}

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl font-bold mb-2">Tuna Taşmaz</h1>
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-2">Product Designer</h2>
        <p className="text-gray-600 dark:text-gray-400 italic mb-8">Istanbul, TURKEY</p>
        
        <div className="space-y-4 mb-8 text-lg">
          <p>Üzerinde çalıştığım ya da ilham alarak boş zamanlarımda tasarladığım tüm çalışmaları burada paylaşıyorum.</p>
          <p>Fotoğraf çekmeyi,</p>
          <p>Kitap okumayı seviyorum.</p>
          <p>Farklı konularda makaleler yazıyorum.</p>
        </div>

        <p className="text-lg font-medium">Beraber tasarlamak için bana ulaşabilirsin</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              {project.cover_image && (
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              {project.content && (
                <Link
                  href={project.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Projeyi İncele
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
