// app/projects/[slug]/page.jsx - Update your existing project page
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getProject(slug) {
  try {
    // Get project data with ACF fields (including SEO)
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?slug=${slug}&_embed&acf=true`, {
      next: { revalidate: 60 }
    })
   
    if (!res.ok) throw new Error('Failed to fetch project')
    const projects = await res.json()
    if (!projects.length) return null
    
    const project = projects[0]
    
    return {
      ...project,
      featured_media_url: project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      // Add SEO data from ACF fields
      seo: {
        title: project.acf?.meta_title || project.title?.rendered,
        description: project.acf?.meta_description || '',
        noindex: project.acf?.no_index || false,
        nofollow: project.acf?.no_follow || false
      }
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Generate metadata using ACF SEO fields instead of RankMath
export async function generateMetadata({ params }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  const metadata = {
    title: project.seo.title,
    description: project.seo.description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.description,
      images: project.featured_media_url ? [
        {
          url: project.featured_media_url,
          width: 1200,
          height: 630,
          alt: project.seo.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.seo.title,
      description: project.seo.description,
      images: project.featured_media_url ? [project.featured_media_url] : [],
    },
  }

  // Add robots meta if needed
  if (project.seo.noindex) {
    metadata.robots = {
      index: false,
      follow: !project.seo.nofollow
    }
  }

  return metadata
}

export default async function ProjectPage({ params }) {
  const { slug } = await params
  const project = await getProject(slug)
 
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

