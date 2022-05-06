import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkoutScreen from './WorkoutScreen';

export type WorkoutStackParamList = {
  WorkoutScreen: undefined;
};

const Stack = createNativeStackNavigator<WorkoutStackParamList>();

export default function WorkoutStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
    </Stack.Navigator>
  );
}
