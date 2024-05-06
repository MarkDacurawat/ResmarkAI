/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "textpro.me",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.yotools.net",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
