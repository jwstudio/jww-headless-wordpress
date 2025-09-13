import Image from 'next/image'
import { notFound } from 'next/navigation'

async function getProject(slug) {
  try {
    // Get basic project data
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?slug=${slug}&_embed`, {
      next: { revalidate: 60 }
    })
   
    if (!res.ok) throw new Error('Failed to fetch project')
    const projects = await res.json()
    if (!projects.length) return null
    
    const project = projects[0]
    
    // Try to get RankMath SEO data using their dedicated endpoint
    let seoData = null
    try {
      const baseUrl = process.env.WORDPRESS_API_URL.replace('/wp-json/wp/v2', '')
      const projectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || baseUrl}/projects/${slug}`
      
      console.log('Trying RankMath endpoint for:', projectUrl)
      
      const seoRes = await fetch(`${baseUrl}/wp-json/rankmath/v1/getHead?url=${encodeURIComponent(projectUrl)}`, {
        next: { revalidate: 60 }
      })
      
      if (seoRes.ok) {
        const seoResponse = await seoRes.json()
        console.log('RankMath API Response:', seoResponse)
        
        // Extract title, description, and keywords from the HTML head
        if (seoResponse.head) {
          const titleMatch = seoResponse.head.match(/<title[^>]*>(.*?)<\/title>/i)
          const descMatch = seoResponse.head.match(/<meta name="description" content="([^"]*)"[^>]*>/i)
          const keywordsMatch = seoResponse.head.match(/<meta name="keywords" content="([^"]*)"[^>]*>/i)
          
          seoData = {
            title: titleMatch ? titleMatch[1] : null,
            description: descMatch ? descMatch[1] : null,
            keywords: keywordsMatch ? keywordsMatch[1] : null
          }
        }
      }
    } catch (seoError) {
      console.log('RankMath API not available:', seoError.message)
    }
    
    return {
      ...project,
      featured_media_url: project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      seo: seoData
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
  const { slug } = await params  // Fix the params await issue
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.'
    }
  }

  // Use RankMath data if available, fallback to WordPress defaults
  const seoTitle = project.seo?.title || project.title.rendered
  const seoDescription = project.seo?.description || ''
  const seoKeywords = project.seo?.keywords || ''
  
  console.log('Final SEO values:', { seoTitle, seoDescription, seoKeywords })
  
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: (project.seo?.ogImage || project.featured_media_url) ? [
        {
          url: project.seo?.ogImage || project.featured_media_url,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: (project.seo?.ogImage || project.featured_media_url) ? [project.seo?.ogImage || project.featured_media_url] : [],
    },
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params  // Fix the params await issue
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