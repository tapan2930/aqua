import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import useStore from '../store/useStore';

import TabNavigator from './TabNavigator';
import UserInfoScreen from '../screens/protected/stacks/UserInfoScreen';
import GlobalConfigScreen from '../screens/protected/stacks/GlobalConfigScreen';
import parameterScreen from '../screens/protected/stacks/parameterScreen';
import CreateAquariumScreen from '../screens/protected/stacks/CreateAquariumScreen';
import ListAquariumScreen from '../screens/protected/stacks/ListAquariumScreen';
import CreateExpenseScreen from '../screens/protected/stacks/CreateExpenseScreen';
import CreateGroupScreen from '../screens/protected/stacks/CreateGroupScreen';
import CreateLiveStockScreen from '../screens/protected/stacks/CreateLiveStockScreen';
import CreateTaskScreen from '../screens/protected/stacks/CreateTaskScreen';
import {themeColors} from '../utils/theme';
import CreateParameterScreen from '../screens/protected/stacks/CreateParameterScreen';
import ListLiveStockScreen from '../screens/protected/stacks/ListLiveStockScreen';
// Create a stack navigator
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const initialLoad = useStore(state => state.app.initialLoad);

  const stackNavigatorOptions = {
    headerShown: false,
    headerStyle: {backgroundColor: themeColors.white},
  };

  const stackGroupOptions = {
    presentation: 'modal',
    headerShown: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <Stack.Navigator
      initialRouteName={initialLoad}
      screenOptions={stackNavigatorOptions}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Group screenOptions={stackGroupOptions}>
        <Stack.Screen
          options={{title: 'Profile'}}
          name="UserInfoScreen"
          component={UserInfoScreen}
        />

        <Stack.Screen
          options={{title: 'Global Config Setup'}}
          name="GlobalConfigScreen"
          component={GlobalConfigScreen}
        />

        <Stack.Screen
          options={{title: 'Parameter Config'}}
          name="ParameterScreen"
          component={parameterScreen}
        />
      </Stack.Group>

      <Stack.Group screenOptions={stackGroupOptions}>
        <Stack.Screen
          options={{title: 'Create Aquarium'}}
          name="CreateAquariumScreen"
          component={CreateAquariumScreen}
        />
        <Stack.Screen
          options={{title: 'All Aquariums'}}
          name="ListAquariumScreen"
          component={ListAquariumScreen}
        />
        <Stack.Screen
          options={{title: 'Create Expense'}}
          name="CreateExpenseScreen"
          component={CreateExpenseScreen}
        />
        <Stack.Screen
          options={{title: 'Groups'}}
          name="CreateGroupScreen"
          component={CreateGroupScreen}
        />
        <Stack.Screen
          options={{title: 'Live Stocks'}}
          name="ListLiveStockScreen"
          component={ListLiveStockScreen}
          initialParams={{isRefresh: true}}
        />
        <Stack.Screen
          options={{title: 'Create Live Stock'}}
          name="CreateLiveStockScreen"
          component={CreateLiveStockScreen}
        />
        <Stack.Screen
          options={{title: 'Create Task'}}
          name="CreateTaskScreen"
          component={CreateTaskScreen}
        />
        <Stack.Screen
          options={{title: 'Create Parameter'}}
          name="CreateParameterScreen"
          component={CreateParameterScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
