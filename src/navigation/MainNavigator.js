import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BASE_API_URL} from '@env';

import useStore from '../store/useStore';

import LoginScreen from '../screens/public/LoginScreen';
import SignupScreen from '../screens/public/SignupScreen';
import VerifyEmailScreen from '../screens/public/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/public/ForgotPasswordScreen';
import VerifyEmailForForgotPassword from '../screens/public/VerifyEmailForForgotPassword';

import AppNavigator from './AppNavigator';
import SplashScreen from '../screens/public/SplashScreen';
import {themeColors} from '../utils/theme';

// Create a stack navigator
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const isAuthenticated = useStore(state => state.user.isAuthenticated);
  const checkUserAndSignOut = useStore(state => state.checkUserSession);
  const isHydrated = useStore(state => state.app.hasHydrated);

  console.log(BASE_API_URL);

  useEffect(() => {
    console.log(isHydrated, 'isHydrated');
    if (isHydrated) {
      checkUserAndSignOut();
    }
  }, [isHydrated]);

  const screenOptions = {
    headerShown: false,
    headerStyle: {backgroundColor: themeColors.background},
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {!isHydrated && (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
        {isAuthenticated ? (
          <Stack.Screen name="AppNavigator" component={AppNavigator} />
        ) : (
          <>
            {!isHydrated && (
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            )}
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen
              name="VerifyEmailScreen"
              component={VerifyEmailScreen}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="VerifyEmailForForgotPassword"
              component={VerifyEmailForForgotPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
