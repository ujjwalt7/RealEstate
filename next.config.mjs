/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tasbqzrmskkmustuzfuu.supabase.co', "picsum.photos"// <-- your Supabase project domain
      // ...add any other domains you use for images
    ],
  },
};

export default nextConfig;
