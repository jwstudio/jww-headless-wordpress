// components/FlexibleContent/index.jsx - Main flexible content renderer
import HeroLayout from './layouts/HeroLayout'
import ProjectSkillsLayout from './layouts/ProjectSkillsLayout'
import TextBlockLayout from './layouts/TextBlockLayout'
import UnknownLayout from './layouts/UnknownLayout'

const layoutComponents = {
  hero: HeroLayout,
  project_skills: ProjectSkillsLayout,
  text_block: TextBlockLayout
}

export default function FlexibleContent({ layouts = [], debug = false }) {
  if (!Array.isArray(layouts) || layouts.length === 0) {
    return debug ? (
      <div className="mb-6 p-4 bg-info bg-opacity-10 rounded">
        <h2>No Flexible Content Found</h2>
        <p>No flexible content layouts are configured for this page.</p>
      </div>
    ) : null
  }

  return (
    <div className="flexible-content">
      {layouts.map((layout, index) => {
        const { acf_fc_layout, ...layoutData } = layout
        const LayoutComponent = layoutComponents[acf_fc_layout] || UnknownLayout
        
        return (
          <LayoutComponent
            key={`${acf_fc_layout}-${index}`}
            layoutType={acf_fc_layout}
            data={layoutData}
            debug={debug}
          />
        )
      })}
    </div>
  )
}