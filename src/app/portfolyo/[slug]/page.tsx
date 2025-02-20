import { Metadata } from 'next'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { unstable_noStore as noStore } from 'next/cache'
import Gallery from './gallery'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: project } = await supabase
    .from('portfolio')
    .select('*')
    .eq('slug', params.slug)
    .single()

  return {
    title: project?.title ? `${project.title} - Tt.` : 'Tt.',
    description: project?.description || 'Product Designer Portfolio',
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  noStore();
  const { data: project, error } = await supabase
    .from('portfolio')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (error || !project) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
        <p>İstediğiniz proje bulunamadı veya yayından kaldırılmış olabilir.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-6">{project.title}</h1>
          
          {project.description && (
            <p className="text-lg text-gray-600 mb-8">{project.description}</p>
          )}

          {project.content && (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content }} />
          )}
        </div>

        <div className="md:w-2/3">
          {project.gallery_images && project.gallery_images.length > 0 && (
            <Gallery images={project.gallery_images} title={project.title} />
          )}

          {project.video_url && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <video
                  controls
                  className="absolute top-0 left-0 w-full h-full"
                  preload="metadata"
                >
                  <source src={project.video_url} type="video/mp4" />
                  Tarayıcınız video elementini desteklemiyor.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
