module.exports = {
  presets: ["blitz/babel"],
  plugins: [
    ["babel-plugin-transform-typescript-metadata"],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
  ],
}
