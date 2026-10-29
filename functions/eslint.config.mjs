import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["lib"]),
	...tseslint.configs.recommended,
	prettier,
]);
