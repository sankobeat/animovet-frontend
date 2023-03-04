const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  reactStrictMode: true,
  distDir: "out",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://animovet-backend.onrender.com/api/:path*",
      },
    ];
  },
};
