import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const { experimental: _experimental, ...nextConfig } = withPayload(
  {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "www.sudharshans.me",
          pathname: "/**",
        }
      ],
    },
    turbopack: {
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
  { devBundleServerPackages: false }
);

export default nextConfig;
