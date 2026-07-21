/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow images from any host so admins can paste product/gallery image URLs
    // from any source (device uploads use data: URLs and bypass this entirely).
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    // Legacy URLs from the previous (Zyro) site → matching new pages,
    // so existing Google links and bookmarks don't 404.
    const legacyProducts = [
      "sunglasses-iubjnq",
      "hand-soap-giguos",
      "wooden-chair-mopukh",
      "classic-cap-hpeszv",
      "wool-sweater-lortoo",
      "set-of-plates-cxlzwx",
      "handmade-vase-slowpy",
      "face-serum-gxrcld",
    ];
    return [
      // Old placeholder product pages → product catalogue
      ...legacyProducts.map((slug) => ({
        source: `/${slug}`,
        destination: "/products",
        permanent: true,
      })),
      // Friendly aliases / common entry points
      { source: "/home", destination: "/", permanent: true },
      { source: "/shop", destination: "/products", permanent: true },
      { source: "/products-list", destination: "/products", permanent: true },
      { source: "/about", destination: "/stories", permanent: true },
      { source: "/about-us", destination: "/stories", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/faqs", destination: "/faq", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
