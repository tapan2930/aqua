module.exports = module.exports = function (api) {
  api.cache(false);

  const presets = ['module:metro-react-native-babel-preset'];

  const plugins = [
    'react-native-reanimated/plugin',
    'module:react-native-dotenv',
  ];

  return {
    presets,
    plugins,
  };
};
