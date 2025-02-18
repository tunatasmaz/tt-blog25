import { Metadata } from 'next'
import { getProjects } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Portfolyo | Projelerim',
  description: 'Geliştirdiğim projeler ve çalışmalarım',
}

export default async function PortfolioPage() {
  const projects = await getProjects()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolyo</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg overflow-hidden">
            {project.cover_image && (
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {project.gallery_images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${project.title} gallery image ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              {project.video_url && (
                <div className="mb-4">
                  <a 
                    href={project.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Proje Videosunu İzle
                  </a>
                </div>
              )}
              <div className="mt-4">
                <a
                  href={project.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Projeyi İncele
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
