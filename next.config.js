/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/old-path/:path*",
        destination: "/new-path/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "ipchas.com",
          },
        ],
        destination: "https://www.windsorbhangraclub.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
