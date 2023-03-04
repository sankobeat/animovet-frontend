const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://animovet-backend.onrender.com/api/:path*",
      },
    ];
  },
};
