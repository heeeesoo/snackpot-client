/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
// const nextConfig = {}

const config = {
    // ...원래 next config 파일
    images: {
        domains: ['kormedi.com','*','i.pinimg.com','i.ytimg.com'],
        formats: ['image/avif', 'image/webp'],
    },
}

const nextConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    // reactStrictMode: true,
    // images: {
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "kormedi.com",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "localhost",
    //   },
    // ],
    // },
    // images: {
    //     domains: ["kormedi.com"],
    // },
})(config);

module.exports = nextConfig
