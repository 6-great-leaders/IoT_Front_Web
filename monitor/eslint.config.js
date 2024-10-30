import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
    { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
      files: ["**/*.vue"],
      languageOptions: { parserOptions: { parser: tseslint.parser } },
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-empty-object-type": "warn",
        "vue/multi-word-component-names": "warn",
        "no-undef": "warn",
        "@typescript-eslint/triple-slash-reference": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
      }
    }
  ];  