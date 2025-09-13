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

export default async function ProjectsPage() {
  const projects = await getProjects()

  if (projects.length === 0) {
    return (
      <div className="container py-5">
        <h1 className="display-4 fw-bold mb-4">Projects</h1>
        <p>No projects found or unable to load projects.</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 fw-bold mb-5">Projects</h1>
      
      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow">
              {project.featured_media_url && (
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={project.featured_media_url}
                    alt={project.title?.rendered || 'Project image'}
                    fill
                    className="card-img-top"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {project.title?.rendered || 'Untitled Project'}
                </h5>
                
                {project.excerpt?.rendered && (
                  <div 
                    className="card-text text-muted mb-3"
                    dangerouslySetInnerHTML={{ 
                      __html: project.excerpt.rendered 
                    }}
                  />
                )}
                
                <div className="mt-auto">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="btn btn-primary"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Optional: Add metadata for SEO
export const metadata = {
  title: 'Projects',
  description: 'View all of our projects and work',
}