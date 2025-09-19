// app/page.jsx - Homepage with SEO
import { getPageBySlug, getProjects } from '../lib/wordpress'
import FlexibleContent from '../components/FlexibleContent'

// Generate metadata for homepage
export async function generateMetadata() {
  const homePage = await getPageBySlug('/')
  
  if (!homePage) {
    return {
      title: 'Home',
      description: 'Welcome to my website'
    }
  }

  const metadata = {
    title: homePage.seo.title,
    description: homePage.seo.description,
  }

  // Add robots meta if needed
  if (homePage.seo.noindex) {
    metadata.robots = {
      index: false,
      follow: !homePage.seo.nofollow
    }
  }

  return metadata
}

export default async function HomePage() {
  const homePage = await getPageBySlug('/')
  
  return (
    <div className="py-8">
      {/* Render flexible content */}
      <FlexibleContent 
        layouts={homePage?.flexibleContent || []} 
        debug={false}
      />
    </div>
  )
}