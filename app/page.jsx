// app/page.jsx - Updated homepage
import { getPageBySlug, getProjects } from '../lib/wordpress'
import FlexibleContent from '../components/FlexibleContent'
import ProjectGrid from '../components/ProjectGrid'

export default async function HomePage() {
  const [homePage, projects] = await Promise.all([
    getPageBySlug('/'), // Will automatically convert to 'home'
    getProjects()
  ])
  
  return (
    <div className="container py-5">
      {/* Render flexible content */}
      <FlexibleContent 
        layouts={homePage?.flexibleContent || []} 
        //debug={process.env.NODE_ENV === 'development'}
        debug={false}
      />
      
      {/* Show projects if available */}
      {projects.length > 0 && (
        <ProjectGrid projects={projects} />
      )}
    </div>
  )
}