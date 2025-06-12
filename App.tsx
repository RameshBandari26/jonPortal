import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardScreen from './components/pages/DashboardScreen';
import UpdateProfileScreen from './components/pages/UpdateProfileScreen';
import HomePage from './components/pages/HomePage';
import Sidebar from './components/pages/Sidebar';
import OpportunitySearchScreen from './components/pages/OpportunitySearchScreen';
import AccountVerificationScreen from './components/pages/settings/AccountVerificationScreen';


import EditBasicDetailsScreen from './components/Details/EditBasicDetailsScreen';
import { EditEducationDetailsScreen } from './components/Details/EditEducationDetailsScreen';
import { EditSkillsDetailsScreen } from './components/Details/EditSkillsDetailsScreen';
import { EditEmploymentDetailsScreen } from './components/Details/EditEmploymentDetailsScreen';
import { EditRolesResponsibilitiesScreen } from './components/Details/EditRolesResponsibilitiesScreen';
import { EditProfessionalDetailsScreen } from './components/Details/EditProfessionalDetailsScreen';

import RegistrationScreen from './components/pages/Register';
import LoginScreen from './components/pages/LoginScreen';
import SplashScreen from './components/pages/SplashScreen';
import RoleSelectionScreen from './components/pages/RoleSelectionScreen';

import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <Sidebar {...props} />}
      initialRouteName="HomePage"
    >
      <Drawer.Screen name="HomePage" component={HomePage} />
      
      {/* You can register more drawer screens here if needed */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectionScreen} />
        <Stack.Screen name="Drawer" component={HomeDrawer} />
        <Stack.Screen name="Profile" component={UpdateProfileScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Search" component={OpportunitySearchScreen} />
        <Stack.Screen name="AccountSettings" component={AccountVerificationScreen} />
        
        {/* Details Screens */}
        <Stack.Screen name="Edit Basic Details" component={EditBasicDetailsScreen} />
        <Stack.Screen name="Edit Education Details" component={EditEducationDetailsScreen} />
        <Stack.Screen name="Edit Skills Details" component={EditSkillsDetailsScreen} />
        <Stack.Screen name="Edit Employment Details" component={EditEmploymentDetailsScreen} />
        <Stack.Screen name="Edit Roles and responsibilities Details" component={EditRolesResponsibilitiesScreen} />
        <Stack.Screen name="Edit Professional Details" component={EditProfessionalDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
