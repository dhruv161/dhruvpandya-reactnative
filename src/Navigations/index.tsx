import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddProduct from '../Screens/AddProduct';
import ProductList from '../Screens/ProductList';
import ProductDetails from '../Screens/ProductDetails';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  function StackNavigator() {
    return (
      <Stack.Navigator
        initialRouteName={'ProductList'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'ProductList'} component={ProductList} />
        <Stack.Screen name={'AddProduct'} component={AddProduct} />
        <Stack.Screen name={'ProductDetails'} component={ProductDetails} />
      </Stack.Navigator>
    );
  }
  return (
    <>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
};
export default Navigation;
