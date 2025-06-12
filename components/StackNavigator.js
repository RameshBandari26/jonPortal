import React from 'react'
import HomePage from './pages/HomePage';
import UpdateProfileScreen from './pages/UpdateProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
  <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Profile" component={UpdateProfileScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator