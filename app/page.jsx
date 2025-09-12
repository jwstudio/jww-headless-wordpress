import Image from 'next/image'
import Link from 'next/link'

async function getProjects() {
  try {
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch projects')
    
    const projects = await res.json()
    
    // Add featured image URLs and ensure all properties exist
    return projects.map(project => ({
      ...project,
      featured_media_url: project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      title: project.title || { rendered: 'Untitled Project' },
      excerpt: project.excerpt || { rendered: '' },
      content: project.content || { rendered: '' }
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function HomePage() {
  const projects = await getProjects()

  if (projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        <p>No projects found or unable to load projects.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.featured_media_url && (
              <div className="relative h-48">
                <Image
                  src={project.featured_media_url}
                  alt={project.title?.rendered || 'Project image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-black">
                {project.title?.rendered || 'Untitled Project'}
              </h2>
              
              {project.excerpt?.rendered && (
                <div 
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ 
                    __html: project.excerpt.rendered 
                  }}
                />
              )}
              
              <Link 
                href={`/projects/${project.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}