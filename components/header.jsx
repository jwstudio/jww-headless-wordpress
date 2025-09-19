'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import netlifyLogo from 'public/netlify-logo.svg';
import githubLogo from 'public/images/github-mark-white.svg';
import { Logo } from './logo';

const navItems = [
    { linkText: 'Services', href: '/services/' },
    { linkText: 'Projects', href: '/projects/' },
    { linkText: 'About Me', href: '/about/' },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="flex items-center justify-between pt-6 pb-12 sm:pt-12 md:pb-24">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            {!!navItems?.length && (
                <ul className="hidden md:flex flex-wrap gap-x-4 gap-y-1">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.href} 
                                className="inline-flex px-1.5 py-1 sm:px-3 sm:py-2 hover:no-underline rounded transition-colors cursor-pointer"
                            >
                                {item.linkText}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {/* Contact */}
            <Link
                href="/contact/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex cursor-pointer bg-white text-black no-underline py-2 px-4 rounded transition-colors items-center"
            >
                Contact Me
            </Link>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className="block w-5 h-0.5 bg-white mb-1" />
                    <span className="block w-5 h-0.5 bg-white mb-1" />
                    <span className="block w-5 h-0.5 bg-white" />
                </div>
            </button>

            {/* Mobile Offcanvas Menu */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={closeMenu}
                />
                
                {/* Menu Panel */}
                <div className={`absolute top-0 right-0 h-full w-full bg-gray-900 shadow-xl transform transition-transform duration-300 ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <Image src={netlifyLogo} alt="Netlify logo" className="h-8" />
                        <button
                            onClick={closeMenu}
                            className="p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="p-6">
                        {!!navItems?.length && (
                            <ul className="space-y-4">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link 
                                            href={item.href}
                                            onClick={closeMenu}
                                            className="block text-lg font-medium text-white hover:text-blue-400 transition-colors cursor-pointer"
                                        >
                                            {item.linkText}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Mobile GitHub Link */}
                        <div className="mt-8 pt-8 border-t border-gray-700">
                            <Link
                                href="https://github.com/netlify-templates/next-platform-starter"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={closeMenu}
                                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                                <Image src={githubLogo} alt="GitHub logo" className="w-6" />
                                <span>View on GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}