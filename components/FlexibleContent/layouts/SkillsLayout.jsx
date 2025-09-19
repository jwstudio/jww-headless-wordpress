// components/FlexibleContent/layouts/SkillsLayout.jsx
import { Title } from '../../ui/Title';
import { Subtitle } from '../../ui/Subtitle';
import { Button } from '../../ui/Button';

export default function SkillsLayout({ data, debug = false }) {
  return (
    <div className="mb-6 bg-gray-800 rounded text-center p-12">
        {data.title && (
            <h4 className="mb-4 text-3xl font-bold">
              {data.title}
            </h4>
          )}
          {data.sub_title && (
            <p className="mb-4">
              {data.sub_title}
            </p>
          )}
   {data.skills && (
              data.skills.map((item, index) => (
                <div className="flex items-center mb-3 inline-flex items-center rounded-md bg-gray-400/10 px-2 py-1 text-xs font-medium text-gray-400 inset-ring inset-ring-gray-400/20" key={index}>
                  <i className={`${item.icon} text-white pe-3 text-xl`}></i>
                  {item.title}
                </div>
              ))
            )}
      {debug && (
        <details className="mt-3">
          <summary>Debug: Skills Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}