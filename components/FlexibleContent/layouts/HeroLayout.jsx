// components/FlexibleContent/layouts/HeroLayout.jsx
import { Title } from '../../ui/Title';
import { Subtitle } from '../../ui/Subtitle';
import { Button } from '../../ui/Button';

export default function HeroLayout({ data, debug = false }) {
  return (
    <div className="hero-section mb-6 bg-light rounded">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {data.title && (
            <Title className="mb-4" size={data.title_size}>
              <span dangerouslySetInnerHTML={{ __html: data.title }} />
            </Title>
          )}
          
          {data.sub_title && (
            <Subtitle className="mb-4 text-2xl" size={data.subtitle_size}>
              {data.sub_title}
            </Subtitle>
          )}
          
          {data.button?.title && data.button?.url && (
            <Button 
              url={data.button.url}
              target={data.button.target}
            >
              {data.button.title}
            </Button>
          )}
        </div>
        {data.list && (
        <div class="flex justify-center pt-5 lg:block lg:pt-0">
          <div class="glass-card h-full w-fit rounded-xl py-5 px-7">
            <h3 className="mb-3">{data.list_title}</h3>
            {data.list && (
              data.list.map((item, index) => (
                <div className="flex items-center mb-3" key={index}>
                  <i className="bi bi-check-circle-fill text-white pe-3 text-xl"></i>
                  {item.list_item}
                </div>
              ))
            )}
            {data.list_button?.title && data.list_button?.url && (
            <Button url={data.list_button.url} target={data.list_button.target}>
              {data.list_button.title}
            </Button>
            )}
            </div>
        </div>
        )}
      </div>
     
      {debug && (
        <details className="mt-3">
          <summary>Debug: Hero Data</summary>
          <pre className="small">{JSON.stringify(data, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}