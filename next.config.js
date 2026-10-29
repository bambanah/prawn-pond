module.exports = {
	agentRules: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
				pathname: "/**",
			},
		],
	},
};
