// app/[slug]/page.jsx - Dynamic page handler
import { getPageBySlug } from '../../lib/wordpress'
import FlexibleContent from '../../components/FlexibleContent'
import { notFound } from 'next/navigation'

export default async function DynamicPage({ params }) {
  const page = await getPageBySlug(params.slug)
  
  if (!page) {
    notFound()
  }
  
  return (
    <div className="container py-5">
      {/* Page title */}
      <h1 className="display-4 fw-bold mb-5">
        {page.title?.rendered || 'Untitled Page'}
      </h1>
      
      {/* Flexible content */}
      <FlexibleContent 
        layouts={page.flexibleContent || []} 
        debug={process.env.NODE_ENV === 'development'}
      />
      
      {/* Regular page content if no flexible content */}
      {(!page.flexibleContent || page.flexibleContent.length === 0) && page.content?.rendered && (
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      )}
    </div>
  )
}