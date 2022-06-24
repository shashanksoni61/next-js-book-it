/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb://localhost:27017/book-it",
    NEXTAUTH_URL: "http://localhost.com:3000/api/v1/auth",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;

// reactStrictMode: true, this key:value is causing component re-rendering twice,
// make it false to avoid this issue;
