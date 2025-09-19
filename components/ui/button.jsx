// components/ui/Button.jsx
import Link from 'next/link';

export function Button({ 
  children, 
  url, 
  target = '_self', 
  className = 'btn btn-primary' 
}) {
  const isExternal = target === '_blank';
  
  return (
    <Link
      href={url}
      className={className}
      target={target}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  );
}