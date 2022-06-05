const path = require("path");

module.exports = {
	sassOptions: {
		includePaths: [path.join(__dirname, "src/styles")],
	},
	images: {
		domains: ["localhost", "", "firebasestorage.googleapis.com"],
	},
	compiler: {
		styledComponents: true,
	},
};
