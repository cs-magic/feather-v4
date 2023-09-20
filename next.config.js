/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  distDir: process.env.DIST ?? ".next",
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
