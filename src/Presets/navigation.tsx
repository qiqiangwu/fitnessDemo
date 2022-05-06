import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityPreset} from './ActivityPreset';
import {AgePreset} from './AgePreset';
import {GenderPreset} from './GenderPreset';
import {GoalPreset} from './GoalPreset';
import {TallPreset} from './TallPreset';
import {WeightPreset} from './WeightPreset';

export type PresetsStackParamList = {
  GenderPreset: undefined;
  GoalPreset: undefined;
  AgePreset: undefined;
  TallPreset: undefined;
  WeightPreset: undefined;
  ActivityPreset: undefined;
};

export type PresetsNavigationProps<
  T extends keyof PresetsStackParamList = keyof PresetsStackParamList,
> = NativeStackNavigationProp<PresetsStackParamList, T>;

const Stack = createNativeStackNavigator<PresetsStackParamList>();

export function PresetsNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GenderPreset" component={GenderPreset} />
      <Stack.Screen name="GoalPreset" component={GoalPreset} />
      <Stack.Screen name="AgePreset" component={AgePreset} />
      <Stack.Screen name="TallPreset" component={TallPreset} />
      <Stack.Screen name="WeightPreset" component={WeightPreset} />
      <Stack.Screen name="ActivityPreset" component={ActivityPreset} />
    </Stack.Navigator>
  );
}
