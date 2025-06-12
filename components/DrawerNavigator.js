// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './components/pages/HomePage';
import Sidebar from './components/pages/Sidebar'; // your custom drawer
import MockInterviews from './components/pages/MockInterviews'; // example screens
import Tutorials from './components/pages/Tutorials';
// ... import all other screens used in Sidebar

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomePage} />
      <Drawer.Screen name="MockInterviews" component={MockInterviews} />
      <Drawer.Screen name="Tutorials" component={Tutorials} />
      {/* Add all other screens listed in Sidebar's menuItems */}
    </Drawer.Navigator>
  );
}
