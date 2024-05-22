import * as React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from '../screens/productList';
import ProductDetails from '../screens/details';
import CartScreen from '../screens/cartScreen';


const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <NavigationContainer>
       <StatusBar  barStyle="dark-content" />
      <Stack.Navigator>
     
         <Stack.Screen
          name="ProductList"
          options={{headerShown: true, gestureEnabled: false}}
          component={ProductList}
        />
         <Stack.Screen
          name="ProductDetails"
          options={{headerShown: true, gestureEnabled: false}}
          component={ProductDetails}
        />
         <Stack.Screen
          name="CartScreen"
          options={{headerShown: true, gestureEnabled: false}}
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ProfileNavigation;
