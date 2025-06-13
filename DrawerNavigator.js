// DrawerNavigator.js
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import DashboardScreen from './components/Admin/DashboardScreen';
import HomePage from './components/pages/HomePage';
import MockInterviews from './components/pages/MockInterviews';
import OpportunitySearchScreen from './components/pages/Opportunities/OpportunitySearchScreen.js';
import AccountVerificationScreen from './components/pages/settings/AccountVerificationScreen';
import Sidebar from './components/pages/Sidebar';
import Tutorials from './components/pages/Tutorials.js';
import UpdateProfileScreen from './components/pages/UpdateProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HomePage" component={HomePage} />
      <Drawer.Screen name="MockInterviews" component={MockInterviews} />
      <Drawer.Screen name="Tutorials" component={Tutorials} />
      <Drawer.Screen name="Profile" component={UpdateProfileScreen} />
      <Drawer.Screen name="Search" component={OpportunitySearchScreen} />
      <Drawer.Screen name="AccountSettings" component={AccountVerificationScreen} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    </Drawer.Navigator>
  );
}
