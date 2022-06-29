module.exports = {
  features: {
    postcss: false,
  },
  stories: ['../src/**/*.stories.[tj]s?(x)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules.push({
      test: /\.(ts|tsx)?$/,
      exclude: [/node_modules/],
      loader: 'ts-loader'
    })

    config.resolve.extensions.push('.ts')
    config.resolve.extensions.push('.tsx')
    return config;
  },
};
