import { Inter } from 'next/font/google'
import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal'],   
    display: 'swap',
    variable: '--font-inter',
})

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/favicon.svg" sizes="any" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"></link>
                <link rel='stylesheet' id='font-awesome-css' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css?ver=6.0.0' type='text/css' media='all' />
            </head>
            <body className={`antialiased text-white bg-dark ${inter.className}`}>
                <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        <Header />
                        <main className="grow">{children}</main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}