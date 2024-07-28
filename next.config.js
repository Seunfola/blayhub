const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'images.pexels.com',
            'i.ytimg.com'
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
    },
    reactStrictMode: true,
    // env: {
    //     DATABASE_URL: process.env.DATABASE_URL,
    //     ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    //     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    //     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    //     UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    //     UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
    // },
    experimental: {
        appDir: true,
    },
};

module.exports = nextConfig;
