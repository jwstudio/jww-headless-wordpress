'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on homepage
  if (pathname === '/') {
    return null
  }
  
  // Split the pathname and filter out empty strings
  const pathSegments = pathname.split('/').filter(segment => segment !== '')
  
  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' }
  ]
  
  // Add each path segment
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Convert slug to readable format
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbItems.push({
      label: label,
      href: currentPath,
      isLast: index === pathSegments.length - 1
    })
  })
  
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-300">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-500">/</span>
            )}
            {item.isLast ? (
              <span className="text-white font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-primary hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}