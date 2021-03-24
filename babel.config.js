module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          screens: './src/screens',
          navigation: './src/navigations',
          components: './src/components',
          styles: './src/styles',
          assets: './src/assets',
          services: './src/services',
          maindata: './src/maindata',
        },
      },
    ],
  ],
};
