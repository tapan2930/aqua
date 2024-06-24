import React from 'react';
import useStore from '../store/useStore';
import TaskScreen from '../screens/protected/tabs/TaskScreen';
import MenuScreen from '../screens/protected/tabs/MenuScreen';
import HomeScreen from '../screens/protected/tabs/HomeScreen';
import ParametersScreen from '../screens/protected/tabs/ParametersScreen';
import ExpenseScreen from '../screens/protected/tabs/ExpenseScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BookmarkCheck,
  BookCheck,
  Home,
  BadgeDollarSign,
  Menu,
} from 'lucide-react-native';
import {themeColors} from '../utils/theme';
import {Icon, Box, Text, VStack} from '@gluestack-ui/themed';

const Tab = createBottomTabNavigator();

export default TabNavigator = () => {
  const screenOptions = ({route}) => ({
    tabBarStyle: {backgroundColor: themeColors.white, height: 70},
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerStyle: {backgroundColor: themeColors.white},
    tabBarShowLabel: false,

    tabBarIcon: ({focused}) => {
      let tab;

      switch (route.name) {
        case 'TaskScreen':
          tab = {icon: BookmarkCheck, title: 'Task'};
          break;
        case 'ParametersScreen':
          tab = {icon: BookCheck, title: 'Parameters'};
          break;
        case 'HomeScreen':
          tab = {icon: Home, title: 'Home'};
          break;
        case 'ExpenseScreen':
          tab = {icon: BadgeDollarSign, title: 'Expense'};
          break;
        case 'MenuScreen':
          tab = {icon: Menu, title: 'Menu'};
          break;
      }

      if (route.name === 'HomeScreen') {
        return (
          <Box
            softShadow="3"
            mt={-70}
            p={16}
            borderRadius={400}
            overflow="hidden"
            backgroundColor={themeColors.primary0}>
            <Icon as={tab.icon} size="30" color={themeColors.white} />
          </Box>
        );
      }

      return (
        <VStack alignItems="center">
          <Icon
            as={tab.icon}
            size="24"
            color={focused ? themeColors.primary0 : themeColors.textColor}
          />
          <Text
            size="sm"
            color={focused ? '$primary400' : '$textColor'}
            fontWeight={focused ? 'bold' : '$medium'}>
            {tab.title}
          </Text>
        </VStack>
      );
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        options={{title: 'Task'}}
        name="TaskScreen"
        component={TaskScreen}
      />
      <Tab.Screen
        options={{title: 'Parameters'}}
        name="ParametersScreen"
        component={ParametersScreen}
      />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen
        options={{title: 'Expenses'}}
        name="ExpenseScreen"
        component={ExpenseScreen}
      />
      <Tab.Screen
        options={{title: 'Menu'}}
        name="MenuScreen"
        component={MenuScreen}
      />
    </Tab.Navigator>
  );
};
