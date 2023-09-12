process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "btg-communication.test",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
