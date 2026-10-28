import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
	{ ignores: ["lib/"] },
	tseslint.configs.recommended,
	prettier,
	{
		rules: {
			"no-console": ["warn", { allow: ["warn", "error"] }],
			quotes: ["error", "double"],
		},
	}
);
