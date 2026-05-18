module.exports = [
  {
    files: ["**/*.js"],

    ignores: [
      "node_modules/**",
      "coverage/**"
    ],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs"
    },

    rules: {
      semi: "off",
      quotes: "off"
    }
  }
];