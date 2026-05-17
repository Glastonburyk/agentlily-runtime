import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**"]
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/require-await": "off"
    }
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off"
    }
  },
  prettier
);
