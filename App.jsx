import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
  Text,
  StatusBar
} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import {config} from '@gluestack-ui/config';
import {themeColors} from './src/utils/theme';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

function App() {
  const customColors = {...config.tokens.colors, ...themeColors }
  const customeTheme = {...config, tokens: {...config.tokens, colors: customColors}}
  
  return (
    <GluestackUIProvider config={customeTheme}>
      <StatusBar barStyle="dark-content"  translucent backgroundColor="transparent" />
        <MainNavigator />
    </GluestackUIProvider>
  );
}

export default App;
