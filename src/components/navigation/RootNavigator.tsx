import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {AuthenticationNavigator} from '../../Authentication';
import {OnboardingNavigator} from '../../Onboarding';
import {PresetsNavigator} from '../../Presets';
import {IRootStore} from '../stores/RootStore';
import BottomTabNavigator from './TabNavigator';
import {RootNavigationProps, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = ({store}: {store?: IRootStore}) => {
  console.log('RootNavigator render');

  const rootRouteName = store?.onboardingStore.inited
    ? store?.loginStore.logined
      ? store?.presetsStore.finished
        ? 'BottomTab'
        : 'PresetsStack'
      : 'AuthenticationStack'
    : 'OnboardingStack';

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={rootRouteName}>
      <Stack.Screen name="OnboardingStack" component={OnboardingNavigator} />
      <Stack.Screen
        name="AuthenticationStack"
        component={AuthenticationNavigator}
      />
      <Stack.Screen name="PresetsStack" component={PresetsNavigator} />

      <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default inject('store')(observer(RootNavigator));
