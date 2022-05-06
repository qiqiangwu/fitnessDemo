import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GoalsStackNavigator} from '../../Goals';
import {HomeStackNavigator} from '../../Home';
import {ProfileStackNavigator} from '../../Profile';
import {WorkoutStackNavigator} from '../../Workout';
import {Image, View} from 'react-native';
import {useTheme} from '../theme';

export type BottomTabParamList = {
  Home: undefined;
  Workout: undefined;
  Goals: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const homeIcon = require('./assets/tabs/home.png');
const workoutIcon = require('./assets/tabs/workout.png');
const goalsIcon = require('./assets/tabs/heart.png');
const profileIcon = require('./assets/tabs/profile.png');

export default function BottomTabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon;

          if (route.name === 'Home') {
            icon = homeIcon;
          } else if (route.name === 'Workout') {
            icon = workoutIcon;
          } else if (route.name === 'Goals') {
            icon = goalsIcon;
          } else if (route.name === 'Profile') {
            icon = profileIcon;
          }

          // You can return any component that you like here!
          return (
            <View style={{marginBottom: 5}}>
              <Image
                source={icon}
                style={{
                  width: size,
                  height: size,
                  tintColor: color,
                }}
              />
            </View>
          );
        },
        tabBarActiveTintColor: theme.color_text_base,
        tabBarInactiveTintColor: theme.tabs_color,
        tabBarStyle: {
          height: 69,
          paddingTop: 12,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-SemiBold',
          fontSize: 8,
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
      <Tab.Screen name="Goals" component={GoalsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}
