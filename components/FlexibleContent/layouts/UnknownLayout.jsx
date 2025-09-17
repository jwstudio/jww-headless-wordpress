// components/FlexibleContent/layouts/UnknownLayout.jsx
export default function UnknownLayout({ layoutType, data, debug = false }) {
  if (!debug) return null
  
  return (
    <div className="unknown-layout mb-6 p-3 border border-warning rounded">
      <h3 className="h5">Unknown Layout: {layoutType}</h3>
      <details>
        <summary>Debug: Layout Data</summary>
        <pre className="small">{JSON.stringify({ layoutType, ...data }, null, 2)}</pre>
      </details>
    </div>
  )
}