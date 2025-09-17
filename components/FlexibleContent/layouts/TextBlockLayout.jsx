// components/FlexibleContent/layouts/TextBlockLayout.jsx
export default function TextBlockLayout({ data, debug = false }) {
  return (
    <div className="text-block mb-6">
      {data.heading && <h2 className="h3 mb-3">{data.heading}</h2>}
      {data.content && (
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      )}
      
      {debug && (
        <details className="mt-3">
          <summary>Debug: Text Block Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}