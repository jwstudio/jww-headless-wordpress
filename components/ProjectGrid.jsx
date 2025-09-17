// components/ProjectGrid.jsx
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-5">
        <p>No projects found.</p>
      </div>
    )
  }

  return (
    <div className="projects-section">
      <h2 className="text-3xl font-bold mb-8">My Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.featured_media_url && (
              <div className="relative h-48 w-full">
                <Image
                  src={project.featured_media_url}
                  alt={project.title?.rendered || 'Project image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                {project.title?.rendered || 'Untitled Project'}
              </h3>
              
              {project.excerpt?.rendered && (
                <div 
                  className="text-gray-600 mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ 
                    __html: project.excerpt.rendered 
                  }}
                />
              )}
              
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
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