import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPortfolioItems } from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache'

export const metadata: Metadata = {
  title: 'Tt.',
  description: 'Product Designer Portfolio',
}

export default async function PortfolioPage() {
  noStore();
  const { data: projects, error } = await getPortfolioItems()

  if (error) {
    console.error('Error fetching projects:', error)
    return <div>Projeler yüklenirken bir hata oluştu.</div>
  }

  // Sadece yayınlanmış projeleri göster
  const publishedProjects = projects?.filter(project => project.published) || []

  if (!publishedProjects || publishedProjects.length === 0) {
    return <div>Henüz proje eklenmemiş.</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Intro Section */}
      <div className="max-w-2xl mb-20">
        <h1 className="text-xl mb-2">Tuna Taşmaz</h1>
        <h2 className="text-gray-600 mb-2">Product Designer</h2>
        <p className="text-gray-600 italic mb-8">Istanbul, TURKEY</p>
        
        <div className="space-y-4 mb-8">
          <p>Üzerinde çalıştığım ya da ilham alarak boş zamanlarımda tasarladığım tüm çalışmaları burada paylaşıyorum.</p>
          <p>Fotoğraf çekmeyi,</p>
          <p>Kitap okumayı seviyorum.</p>
          <p>Farklı konularda makaleler yazıyorum.</p>
        </div>

        <p className="font-medium">Beraber tasarlamak için bana ulaşabilirsin</p>
      </div>

      {/* Portfolio Section */}
      <section>
        <h2 className="text-2xl mb-8">Çalışmalar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolyo/${project.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {project.cover_image && (
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-4 h-[150px] overflow-hidden">
                <h3 className="text-lg font-medium mb-2 group-hover:text-gray-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
