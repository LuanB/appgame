/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import 'react-native-gesture-handler';

import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Appearance,
  useColorScheme,
  AppearanceProvider,
} from 'react-native-appearance';

import NasaScreen from './src/screens/NasaScreen';
import CellScreen from './src/screens/CellScreen';

const MaterialBottomTabs = createMaterialBottomTabNavigator();

const App = () => {
  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: '#65509f',
      text: 'white',
      border: 'green',
    },
  };

  const createBottomTabs = () => {
    return (
      <MaterialBottomTabs.Navigator>
        <MaterialBottomTabs.Screen
          name="Nasa"
          style={{marginBottom: 16}}
          component={NasaScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Icon style={[{color: 'white'}]} size={25} name={'home'} />
            ),
          }}
        />
        <MaterialBottomTabs.Screen
          name="CellGame"
          component={CellScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => (
              <Icon style={[{color: 'white'}]} size={25} name={'human'} />
            ),
          }}
        />
      </MaterialBottomTabs.Navigator>
    );
  };

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}>
        {createBottomTabs()}
      </NavigationContainer>
    </AppearanceProvider>
  );
};
export default App;
