module.exports = {
  testEnvironment: "node",

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageReporters: ["text", "lcov"],

  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "./coverage",
        filename: "report.html",
        expand: true,
      },
    ],
  ],
};
