

const nextConfig = {
  // Allow reading files from parent directory (study-guides, concepts, fundamentals)
  experimental: {},
  async headers() {
    return [
      {
        // Required for StackBlitz WebContainers (SharedArrayBuffer needs cross-origin isolation).
        // Safe to apply globally — all assets are same-origin (next/font self-hosts, no external CDN).
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ]
  },
}

export default nextConfig
