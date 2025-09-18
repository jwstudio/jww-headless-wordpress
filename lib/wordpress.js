// lib/wordpress.js - Updated with SEO field handling
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
    
    const page = pages[0]
    
    return {
      ...page,
      acfFields: page.acf || {},
      flexibleContent: page.acf?.page || [],
      // Extract SEO data from your ACF fields
      seo: {
        title: page.acf?.meta_title || page.title?.rendered,
        description: page.acf?.meta_description || '',
        noindex: page.acf?.no_index || false,
        nofollow: page.acf?.no_follow || false
      }
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
    
    const post = posts[0]
    
    return {
      ...post,
      acfFields: post.acf || {},
      flexibleContent: post.acf?.content || post.acf?.page || [],
      featured_media_url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      // Add SEO data for posts too
      seo: {
        title: post.acf?.meta_title || post.title?.rendered,
        description: post.acf?.meta_description || '',
        noindex: post.acf?.no_index || false,
        nofollow: post.acf?.no_follow || false
      }
    }
  } catch (error) {
    console.error(`Error fetching ${postType} ${slug}:`, error)
    return null
  }
}

export async function getProjects() {
  try {
    const res = await fetch(`${process.env.WORDPRESS_API_URL}/projects?_embed&acf=true`, {
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
      flexibleContent: project.acf?.content || project.acf?.page || [],
      // Add SEO data for projects
      seo: {
        title: project.acf?.meta_title || project.title?.rendered,
        description: project.acf?.meta_description || '',
        noindex: project.acf?.no_index || false,
        nofollow: project.acf?.no_follow || false
      }
    }))
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

