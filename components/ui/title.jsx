// components/ui/Title.jsx
export function Title({ children, size = 'h1', className = 'display-4' }) {
  const Tag = size;
  return <Tag className={className}>{children}</Tag>;
}