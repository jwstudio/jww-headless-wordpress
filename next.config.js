/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'jameswhitbyweb.co.uk',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

module.exports = nextConfig;