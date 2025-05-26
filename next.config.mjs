import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const { experimental: _experimental, ...nextConfig } = withPayload(
  {
    turbopack: {
      resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    },
  },
  { devBundleServerPackages: false },
);

export default nextConfig;
