// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

// Screens
import DashboardScreen from './components/Admin/DashboardScreen';
import EditBasicDetailsScreen from './components/Details/EditBasicDetailsScreen';
import { EditEducationDetailsScreen } from './components/Details/EditEducationDetailsScreen';
import { EditEmploymentDetailsScreen } from './components/Details/EditEmploymentDetailsScreen';
import { EditProfessionalDetailsScreen } from './components/Details/EditProfessionalDetailsScreen';
import { EditRolesResponsibilitiesScreen } from './components/Details/EditRolesResponsibilitiesScreen';
import { EditSkillsDetailsScreen } from './components/Details/EditSkillsDetailsScreen';
import JobCard from './components/pages/JobCard';
import LoginScreen from './components/pages/LoginScreen';
import JobResultsScreen from './components/pages/Opportunities/JobResultsScreen';
import OpportunitySearchScreen from './components/pages/Opportunities/OpportunitySearchScreen';
import RegistrationScreen from './components/pages/Register';
import RoleSelectionScreen from './components/pages/RoleSelectionScreen';
import AccountVerificationScreen from './components/pages/settings/AccountVerificationScreen';
import NotificationScreen from './components/pages/settings/NotificationScreen';
import SplashScreen from './components/pages/SplashScreen';

import UpdateProfileScreen from './components/pages/UpdateProfileScreen';
import PostJobs from './components/Recruiter/PostJobs';
import RecruiterHomePage from './components/Recruiter/RecruiterHomePage';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {/* Auth flow */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectionScreen} />

        {/* Main Drawer Navigation */}
        <Stack.Screen name="Drawer" component={DrawerNavigator} />

        {/* Detail/edit screens */}
        <Stack.Screen name="Profile" component={UpdateProfileScreen} />
        <Stack.Screen name="JobCard" component={JobCard} />
        <Stack.Screen name="PostJobs" component={PostJobs} />
        <Stack.Screen name="Search" component={OpportunitySearchScreen} />
        <Stack.Screen name="AccountSettings" component={AccountVerificationScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />

        {/* Admin */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Edit Basic Details" component={EditBasicDetailsScreen} />
        <Stack.Screen name="Edit Education Details" component={EditEducationDetailsScreen} />
        <Stack.Screen name="Edit Skills Details" component={EditSkillsDetailsScreen} />
        <Stack.Screen name="Edit Employment Details" component={EditEmploymentDetailsScreen} />
        <Stack.Screen name="Edit Roles and responsibilities Details" component={EditRolesResponsibilitiesScreen} />
        <Stack.Screen name="Edit Professional Details" component={EditProfessionalDetailsScreen} />
        <Stack.Screen name="JobResults" component={JobResultsScreen} />

        {/* Recruiter */}
        <Stack.Screen name="RecruiterHomePage" component={RecruiterHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
