import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from '../pages/HomePage';
import React from 'react';

const Drawer = createDrawerNavigator();

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      {/* Add more screens here if needed */}
    </Drawer.Navigator>
  );
}
