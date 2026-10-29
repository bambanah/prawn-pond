import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores([".next", "next-env.d.ts", "public", "functions"]),
	...nextVitals,
	...tseslint.configs.recommended,
	prettier,
	{
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }],
		},
	},
]);
