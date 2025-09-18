// app/sitemap.js - Generate sitemap with SEO fields
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

  try {
    // Get all pages with ACF fields
    const pagesRes = await fetch(`${process.env.WORDPRESS_API_URL}/pages?acf=true`)
    const pages = await pagesRes.json()
    
    // Get all projects with ACF fields
    const projectsRes = await fetch(`${process.env.WORDPRESS_API_URL}/projects?acf=true`)
    const projects = await projectsRes.json()

    const sitemapEntries = []

    // Add pages (exclude noindex ones)
    pages.forEach(page => {
      if (!page.acf?.no_index) {
        sitemapEntries.push({
          url: `${baseUrl}/${page.slug === 'home' ? '' : page.slug}`,
          lastModified: new Date(page.modified),
          priority: page.slug === 'home' ? 1.0 : 0.8
        })
      }
    })

    // Add projects (exclude noindex ones)
    projects.forEach(project => {
      if (!project.acf?.no_index) {
        sitemapEntries.push({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: new Date(project.modified),
          priority: 0.6
        })
      }
    })

    return sitemapEntries
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return []
  }
}