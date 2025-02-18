import Image from 'next/image'
import Link from 'next/link'
import { getPortfolioItems } from '@/lib/db'

export default async function PortfolioPage() {
  const { data: projects, error } = await getPortfolioItems()

  if (error) {
    console.error('Error fetching projects:', error)
    return <div>Projeler yüklenirken bir hata oluştu.</div>
  }

  if (!projects || projects.length === 0) {
    return <div>Henüz proje eklenmemiş.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Portfolyo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/portfolyo/${project.id}`}
            className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {project.cover_image && (
              <div className="relative h-64 w-full">
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                  Detayları Gör
                </span>
                <svg
                  className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
