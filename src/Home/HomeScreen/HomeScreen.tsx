import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {
  BorderlessButton,
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IRootStore, RootNavigationProps, useTheme} from '../../components';
import HomeSlider from './HomeSlider';
import PopularWorkouts from './PopularWorkouts';
import WorkoutList from './WorkoutList';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

const homeSliderData = [
  {
    label: 'Upper Body Workout',
    image: require('./assets/1.png'),
  },
  {
    label: 'Upper Body Workout',
    image: require('./assets/1.png'),
  },
  {
    label: 'Upper Body Workout',
    image: require('./assets/1.png'),
  },
];

const popularWorkoutData = [
  {
    title: 'Yoga Sculpt',
    duration: '120 Hours',
    image: require('./assets/popular.png'),
  },
  {
    title: 'Flow Plates',
    duration: '120 Hours',
    image: require('./assets/popular.png'),
  },
  {
    title: 'Strong & Slim',
    duration: '120 Hours',
    image: require('./assets/popular.png'),
  },
];

const workoutListData = [
  {
    image: require('./assets/card.png'),
    title: 'Bodyweight Training',
  },
  {
    image: require('./assets/card.png'),
    title: 'Bodyweight Training',
  },
];

const HomeScreen = ({store: {loginStore}}: {store: IRootStore}) => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProps>();
  const searchHandler = () => {
    loginStore.logout();
    
    navigation.replace('AuthenticationStack', {
      screen: 'Login',
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.fill_body,
      }}>
      <ScrollView style={{flex: 1}}>
        <GestureHandlerRootView>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.fill_body}
          />
          <View
            style={[
              styles.header,
              {
                paddingHorizontal: theme.h_spacing_xl,
              },
            ]}>
            <BorderlessButton>
              <Icon name="bell" size={20} />
            </BorderlessButton>
            <BorderlessButton onPress={searchHandler}>
              <Icon name="search" size={20} />
            </BorderlessButton>
          </View>
          <HomeSlider data={homeSliderData} />
          <PopularWorkouts data={popularWorkoutData} />
          <View
            style={{
              padding: theme.h_spacing_m,
            }}>
            <WorkoutList data={workoutListData} />
          </View>
        </GestureHandlerRootView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(HomeScreen));
