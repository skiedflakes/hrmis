import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
export default function StackNavigationHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        key="LoginScreen"
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        key="HomeScreen"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
