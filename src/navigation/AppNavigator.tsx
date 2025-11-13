import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import ProfileSelectScreen from '../screens/ProfileSelectScreen';
import ChefLoginScreen from '../screens/ChefLoginScreen';
import Client1LoginScreen from '../screens/Client1LoginScreen';
import Client2LoginScreen from '../screens/Client2LoginScreen';
import ChefSignupScreen from '../screens/ChefSignupScreen';
import ClientSignupScreen from '../screens/ClientSignupScreen';
import AddMenuItemScreen from '../screens/AddMenuItemScreen';
import ForgotPasswordScreen from '../screens/ForgottenPasswordScreen';
import ChefHomeScreen from '../screens/ChefHomeScreen';
import Client1HomeScreen from '../screens/Client1HomeScreen';
import Client2HomeScreen from '../screens/Client2HomeScreen';
import FilterByCourseScreen from '../screens/FilterByCourseScreen';
import { Course } from '../types';

export type RootStackParamList = {
  Splash: undefined;
  ProfileSelect: undefined;
  ChefLogin: undefined;
  Client1Login: undefined;
  Client2Login: undefined;
  ChefSignup: undefined;
  // 🟢 FIXED: Now requires a clientType parameter
  ClientSignup: { clientType: 'client1' | 'client2' }; 
  ForgotPassword: undefined;
  ChefHome: undefined;
  Client1Home: undefined;
  Client2Home: undefined;
  AddMenuItem: undefined;
  FilterByCourse: undefined;
  CourseDetail: { course: Course };
  AllCourses: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="ProfileSelect" component={ProfileSelectScreen} />
      <Stack.Screen name="ChefLogin" component={ChefLoginScreen} />
      <Stack.Screen name="Client1Login" component={Client1LoginScreen} />
      <Stack.Screen name="Client2Login" component={Client2LoginScreen} />
      <Stack.Screen name="ChefSignup" component={ChefSignupScreen} />
      <Stack.Screen name="ClientSignup" component={ClientSignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChefHome" component={ChefHomeScreen} />
      <Stack.Screen name="Client1Home" component={Client1HomeScreen} />
      <Stack.Screen name="Client2Home" component={Client2HomeScreen} />
      <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
      <Stack.Screen name="FilterByCourse" component={FilterByCourseScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;