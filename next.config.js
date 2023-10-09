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
      {
        protocol: "https",
        hostname: "admin.btg-dev.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
