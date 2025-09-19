// components/FlexibleContent/layouts/ProjectsLayout.jsx
import { Title } from '../../ui/Title';
import { Subtitle } from '../../ui/Subtitle';
import { Button } from '../../ui/Button';

export default function ProjectsLayout({ data, debug = false }) {
  return (
    <div className="mb-6 bg-light rounded">
     Projects coming soon!
     <ul className="p-4 disc list-disc">
        <li>First create the custom post type through a plugin</li>
        <li>Create acf fields</li>
        <li>Populate fields</li>
        <li>Design cards for data that should already be grabed by the api if the cpt name stays the same</li>
     </ul>
      {debug && (
        <details className="mt-3">
          <summary>Debug: Projects Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}