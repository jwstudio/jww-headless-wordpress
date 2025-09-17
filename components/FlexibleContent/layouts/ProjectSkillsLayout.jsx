// components/FlexibleContent/layouts/ProjectSkillsLayout.jsx
export default function ProjectSkillsLayout({ data, debug = false }) {
  return (
    <div className="skills-section mb-6">
      <h2 className="h3 mb-3">Skills & Technologies</h2>
      {data.skills && Array.isArray(data.skills) && (
        <div className="row g-3">
          {data.skills.map((skill, index) => (
            <div key={index} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  {skill.name && <h5 className="card-title">{skill.name}</h5>}
                  {skill.level && <p className="card-text">Level: {skill.level}</p>}
                  {skill.description && <p className="card-text">{skill.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {debug && (
        <details className="mt-3">
          <summary>Debug: Skills Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  )
}