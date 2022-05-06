import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './Onboarding';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
