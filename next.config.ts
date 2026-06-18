
const nextConfig = {
  async rewrites() {
    return [
      {
        // 💡 1. 관리자 API 로컬 프록시 설정
        source: '/tbad-404/:path*',
        destination: `https://${process.env.API_ADMIN_SERVER_URL}/:path*`,
      },
      {
        // 💡 2. 파일/결과물 로컬 프록시 설정
        source: '/k9-v2r/:path*',
        destination: `https://${process.env.API_ADMIN_FILE_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
