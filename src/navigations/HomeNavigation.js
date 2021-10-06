import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
import ApplyScreen from 'screens/ApplyScreen';
import ViewScreen from 'screens/ViewScreen';
import DateScreen from 'screens/DateScreen';
import DateScreenPriviledge from 'screens/DateScreenPriviledge';
import ChangePasswordScreen from 'screens/ChangePasswordScreen';

export default function StackNavigationHome({route}) {
  const {screenlist} = route.params;

  const commonScreens = {
    HomeScreen: HomeScreen,
    LoginScreen: LoginScreen,
    ApplyScreen: ApplyScreen,
    ViewScreen: ViewScreen,
    DateScreen: DateScreen,
    DateScreenPriviledge: DateScreenPriviledge,
    ChangePasswordScreen: ChangePasswordScreen,
  };

  const authScreens = {
    LoginScreen: LoginScreen,
    HomeScreen: HomeScreen,
    ApplyScreen: ApplyScreen,
    ViewScreen: ViewScreen,
    DateScreen: DateScreen,
    DateScreenPriviledge: DateScreenPriviledge,
    ChangePasswordScreen: ChangePasswordScreen,
  };

  return (
    <Stack.Navigator>
      {Object.entries({
        ...(screenlist == 'home' ? commonScreens : authScreens),
      }).map(([name, component]) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
}
