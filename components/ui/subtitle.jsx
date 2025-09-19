
// components/ui/Subtitle.jsx
export function Subtitle({ children, size = 'h2', className = '' }) {
  const Tag = size;
  return <Tag className={className}>{children}</Tag>;
}