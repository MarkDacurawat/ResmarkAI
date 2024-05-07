/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
