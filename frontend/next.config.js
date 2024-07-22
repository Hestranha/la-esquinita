// frontend/next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://la-esquinita-backend.vercel.app/:path*', // Proxy to Backend
      },
    ];
  },
};
