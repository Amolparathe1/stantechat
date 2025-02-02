import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/homePage/homeScreen';
import AddEditScreen from '../screens/editPage/addEditScreen';
import ProfileScreen from '../screens/profilePage/profileScreen';

export type RootStackParamList = {
  Home: undefined;
  AddEdit: { item?: { id: number; name: string; description: string } };
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Item List' }} />
      <Stack.Screen name="AddEdit" component={AddEditScreen} options={{ title: 'Add / Edit Item' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
