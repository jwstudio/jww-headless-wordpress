export async function getPageBySlug(slug) {
  try {
    // Handle homepage special case
    const apiSlug = slug === '/' || slug === '' ? 'home' : slug
    
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/pages?slug=${apiSlug}&acf=true`,
      { next: { revalidate: 60 } }
    )
    
    if (!res.ok) throw new Error(`Failed to fetch page: ${slug}`)
    
    const pages = await res.json()
    if (!pages.length) return null
    
    return {
      ...pages[0],
      acfFields: pages[0].acf || {},
      flexibleContent: pages[0].acf?.page || []
    }
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error)
    return null
  }
}

export async function getPostBySlug(slug, postType = 'posts') {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/${postType}?slug=${slug}&acf=true&_embed`,
      { next: { revalidate: 60 } }
    )
    
    if (!res.ok) throw new Error(`Failed to fetch ${postType}: ${slug}`)
    
    const posts = await res.json()
    if (!posts.length) return null
    
    return {
      ...posts[0],
      acfFields: posts[0].acf || {},
      flexibleContent: posts[0].acf?.content || posts[0].acf?.page || [],
      featured_media_url: posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
    }
  } catch (error) {
    console.error(`Error fetching ${postType} ${slug}:`, error)
    return null
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?_embed`, {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) throw new Error('Failed to fetch projects')
    
    const projects = await res.json()
    
    return projects.map(project => ({
      ...project,
      featured_media_url: project._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      title: project.title || { rendered: 'Untitled Project' },
      excerpt: project.excerpt || { rendered: '' },
      content: project.content || { rendered: '' },
      acfFields: project.acf || {},
      flexibleContent: project.acf?.content || project.acf?.page || []
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}