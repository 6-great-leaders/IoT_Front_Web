// monitor/eslint.config.js
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import ts from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  vue.configs["vue3-recommended"],
  ts.configs.recommended,
  {
    files: ["**/*.{js,ts,vue}"],
    rules: {},
  },
];
