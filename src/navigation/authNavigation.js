import * as React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../screens/Auth/loginPage';


const Stack = createStackNavigator();

function AuthNavigation() {
  return (
    <NavigationContainer>
       <StatusBar  barStyle="dark-content" />
      <Stack.Navigator>
      <Stack.Screen
          name="LoginPage"
          options={{headerShown: false, gestureEnabled: false}}
          component={LoginPage}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigation;
