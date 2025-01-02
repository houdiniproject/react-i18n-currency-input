module.exports = {

  stories: ['../stories/**/*.stories.[tj]s?(x)'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  docs: {}
};