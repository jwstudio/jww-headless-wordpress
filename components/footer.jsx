import Link from 'next/link';
import { Breadcrumbs } from './breadcrumbs';
import { Logo } from './logo';

export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="pb-12 pt-6 sm:pb-16 border-t-1 border-white">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-6">
                <div>
                    <Logo />
                </div>
                <div>
                    <p className="text-2xl mb-2">Pages</p>
                    <ul className="list-none space-y-1">
                        <li>
                            <Link href="/" className="no-underline text-white hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/services/" className="no-underline text-white hover:underline">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/projects/" className="no-underline text-white hover:underline">
                                Projects
                            </Link>
                        </li>
                        <li>
                            <Link href="/about/" className="no-underline text-white hover:underline">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-2xl mb-2">Contact</p>
                    <ul className="list-none space-y-1">
                        <li>
                            <Link href="/contact/" className="no-underline text-white hover:underline">
                                Contact Form
                            </Link>
                        </li>
                        <li>
                            <Link href="mailto:info@jameswhitbyweb.co.uk" className="no-underline text-white hover:underline">
                                info@jameswhitbyweb.co.uk
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/jameswhitbyweb/" target="_blank" className="no-underline text-white hover:underline">
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
{/* Breadcrumbs */}
                <div className="mb-4 flex justify-end">
                    <Breadcrumbs />
                </div>
            {/* Bottom section with copyright, and links */}
            <div className="pt-6 border-t-1 border-white">
                
                
                {/* Copyright and links */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    {/* Links - first on mobile, center on desktop */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm order-1 md:order-2">
                        <Link href="/privacy/" className="no-underline text-white/80 hover:text-white hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms/" className="no-underline text-white/80 hover:text-white hover:underline">
                            Terms of Service
                        </Link>
                        <Link href="/sitemap/" className="no-underline text-white/80 hover:text-white hover:underline">
                            Sitemap
                        </Link>
                    </div>
                    
                    {/* Copyright - second on mobile, left on desktop */}
                    <div className="text-sm text-white/80 order-2 md:order-1">
                        © {currentYear} James Whitby Web. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}