import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",  // Disables the rule for unescaped entities
      "@typescript-eslint/no-explicit-any": "off",  // Disables the rule for explicit `any` usage
      "react-hooks/exhaustive-deps": "warn",  // Sets the `useEffect` dependency warning as a warning instead of an error
      "@typescript-eslint/no-unused-vars": "warn",  // Marks unused variable errors as warnings instead of errors
    },
  },
];

export default eslintConfig;
