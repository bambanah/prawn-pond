const path = require("path");

module.exports = {
	future: {
		webpack5: true,
	},
	target: "serverless",
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	images: {
		domains: ["localhost", ""],
	},
};
