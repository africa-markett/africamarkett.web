/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["images.unsplash.com", "cdn.prod.website-files.com"],
		// or remotePatterns: [{ protocol:'https', hostname:'images.unsplash.com' }, { protocol:'https', hostname:'cdn.prod.website-files.com' }],
	},
	reactStrictMode: true,
};

export default nextConfig;
