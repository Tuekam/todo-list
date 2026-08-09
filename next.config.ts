import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@todo-list/presentation",
    "@todo-list/core",
    "@todo-list/domain",
    "@todo-list/data"
  ]
};

export default nextConfig;
