import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import NewReceita from './screens/newReceitaSceen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Receitinhas" component={HomeScreen} />
        <Stack.Screen name="NewReceita" component={NewReceita} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
