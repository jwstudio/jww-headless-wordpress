import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getProject(slug) {
  try {
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch project')
    
    const projects = await res.json()
    
    if (!projects.length) return null
    
    return {
      ...projects[0],
      featured_media_url: projects[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">
        {project.title.rendered}
      </h1>
      
      {project.featured_media_url && (
        <div className="relative h-96 mb-8">
          <Image
            src={project.featured_media_url}
            alt={project.title.rendered}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
      
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ 
          __html: project.content.rendered 
        }}
      />
    </div>
  )
}

// Generate static paths for projects
export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects`)
    const projects = await res.json()
    
    return projects.map((project) => ({
      slug: project.slug
    }))
  } catch (error) {
    return []
  }
}