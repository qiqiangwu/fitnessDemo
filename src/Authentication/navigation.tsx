import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {LoginSplash} from './LoginSplash';
import {Login} from './Login';
import {SignUp} from './SignUp';

export type AuthenticationStackParamList = {
  LoginSplash: undefined;
  Login: undefined;
  SignUp:
    | {
        from: 'Login';
      }
    | undefined;
};

export type AuthenticationNavigationProp<
  T extends keyof AuthenticationStackParamList = keyof AuthenticationStackParamList,
> = NativeStackNavigationProp<AuthenticationStackParamList, T>;

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

export default function AuthenticationNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginSplash" component={LoginSplash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
