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
			"quote-props": ["error", "consistent-as-needed"],
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-empty-object-type": "warn",
			"@typescript-eslint/no-unsafe-function-type": "warn",
			"@typescript-eslint/no-wrapper-object-types": "warn",
			"@typescript-eslint/no-explicit-any": "warn",
			"react-hooks/immutability": "warn",
			"react-hooks/set-state-in-effect": "warn",
			"import/no-anonymous-default-export": "off",
			"prefer-template": "error",
			"arrow-parens": ["error", "always"],
			"@next/next/no-img-element": "off",
			"no-console": ["error", { allow: ["warn", "error"] }],
		},
	},
]);
