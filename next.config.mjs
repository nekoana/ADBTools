/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config, {}) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config

    // Important: return the modified config
    return config;
  },
};

export default nextConfig;
