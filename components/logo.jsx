import Link from 'next/link';

export function Logo({ size = 'text-xl' }) {
    return (
        <Link 
            href="/" 
            className={`cursor-pointer font-bold no-underline ${size}`}
        >
            James <span className="text-primary">Whitby</span> <span className="text-secondary">Web</span>
        </Link>
    );
}