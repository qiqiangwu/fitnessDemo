import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingStack} from './src/Onboarding';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OnboardingStack"
              component={OnboardingStack}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
