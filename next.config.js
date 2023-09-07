/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
// const nextConfig = {}

const config = {
    // ...원래 next config 파일
}

const nextConfig = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
})(config);

module.exports = nextConfig
