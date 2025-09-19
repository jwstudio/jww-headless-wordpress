// app/[slug]/page.jsx - Dynamic pages with SEO
import { getPageBySlug } from '../../lib/wordpress'
import FlexibleContent from '../../components/FlexibleContent'
import { notFound } from 'next/navigation'

// Generate metadata for dynamic pages
export async function generateMetadata({ params }) {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    }
  }

  const metadata = {
    title: page.seo.title,
    description: page.seo.description,
  }

  // Add robots meta if needed
  if (page.seo.noindex) {
    metadata.robots = {
      index: false,
      follow: !page.seo.nofollow
    }
  }

  return metadata
}

export default async function DynamicPage({ params }) {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <div className="mx-auto py-8">

      {/* Flexible content */}
      <FlexibleContent 
        layouts={page.flexibleContent || []} 
        debug={false}
      />
      
      {/* Regular page content if no flexible content */}
      {(!page.flexibleContent || page.flexibleContent.length === 0) && page.content?.rendered && (
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }} 
        />
      )}
    </div>
  )
}