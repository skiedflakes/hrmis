import React, {useState, useEffect, Alert} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigation from 'navigations/HomeNavigation';
import SplashScreen from 'screens/SplashScreen';
const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();
export default function App() {
  global.url = 'https://api.eevolve.asia';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'splashscreen'}
          component={SplashScreen}
          options={{headerShown: false, cardStyleInterpolator: forFade}}
        />
        <Stack.Screen
          name={'main'}
          component={HomeNavigation}
          options={{headerShown: false, cardStyleInterpolator: forFade}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
