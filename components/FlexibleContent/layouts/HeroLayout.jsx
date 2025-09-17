// components/FlexibleContent/layouts/HeroLayout.jsx
import Link from 'next/link'

export default function HeroLayout({ data, debug = false }) {
  const renderTitle = () => {
    if (!data.title) return null
    const Tag = data.title_size || 'h1'
    return <Tag className="display-4">{data.title}</Tag>
  }

  const renderSubtitle = () => {
    if (!data.subtitle) return null
    const Tag = data.subtitle_size || 'h2'
    return <Tag>{data.subtitle}</Tag>
  }

  const renderButton = () => {
    if (!data.text_and_url?.title || !data.text_and_url?.url) return null
    
    return (
      <Link 
        href={data.text_and_url.url} 
        className="btn btn-primary"
        target={data.text_and_url.target || '_self'}
        rel={data.text_and_url.target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {data.text_and_url.title}
      </Link>
    )
  }

  return (
    <div className="hero-section mb-6 p-4 bg-light rounded">
      <div className="grid grid-cols-2 gap-4">
        <div>
          {renderTitle()}
          {renderSubtitle()}
          {renderButton()}
        </div>
        <div>
          {/* Add hero image or other content here */}
        </div>
      </div>
      
      {debug && (
        <details className="mt-3">
          <summary>Debug: Hero Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}