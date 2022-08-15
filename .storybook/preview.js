import '!style-loader!css-loader!sass-loader!../src/styles/index.scss' // 全局样式

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}