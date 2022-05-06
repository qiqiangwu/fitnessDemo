import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  BorderlessButton,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import OnboardingPage from './OnboardingPage';
import {useTheme} from '../components';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../components/navigation';
import Color from 'color';
import {inject, observer} from 'mobx-react';
import {IRootStore} from '../components/stores/RootStore';
import {IOnboardingPageSnapshotOut} from './stores/OnboardingStore';
import {values} from 'mobx';

const assets = [
  require('./assets/1.png'),
  require('./assets/2.png'),
  require('./assets/3.png'),
];

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 33,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
  },
});

const Onboarding = observer(({store}: {store: IRootStore}) => {
  const navigation =
    useNavigation<RootNavigationProps<'AuthenticationStack'>>();
  const theme = useTheme();
  const translationX = useSharedValue(0);

  const {width} = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
  });

  const scrollRef = React.createRef<Animated.ScrollView>();

  const goNext = () => {
    if (store.loginStore.logined) {
      if (store.presetsStore.finished) {
        navigation.replace('BottomTab');
      } else {
        navigation.replace('PresetsStack');
      }
    } else {
      navigation.replace('AuthenticationStack', {
        screen: 'LoginSplash',
      });
    }
  };

  const dotColor = Color(theme.brand_primary).alpha(0.5).toString();

  useEffect(() => {
    store.onboardingStore.markInited(true);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.fill_body,
      }}
      edges={['bottom']}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.fill_body} />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Animated.ScrollView
            ref={scrollRef}
            style={{flex: 1}}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={1}>
            {store.onboardingStore.pagesToArray.map((item, index) => {
              return (
                <OnboardingPage
                  key={item.id}
                  title={item.title}
                  image={assets[index]}
                  description={item.description}
                />
              );
            })}
          </Animated.ScrollView>
          <View
            style={[
              styles.footer,
              {
                paddingHorizontal: theme.h_spacing_m,
              },
            ]}>
            <BorderlessButton onPress={goNext}>
              <Text
                style={[
                  styles.actionText,
                  {
                    color: theme.color_text_base,
                  },
                ]}>
                SKIP
              </Text>
            </BorderlessButton>
            <View style={styles.indicatorContainer}>
              {store.onboardingStore.pagesToArray.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                  const backgroundColor = interpolateColor(
                    translationX.value,
                    [width * (index - 1), width * index, width * (index + 1)],
                    [dotColor, theme.brand_primary, dotColor],
                  );
                  return {
                    backgroundColor,
                  };
                });

                return (
                  <Animated.View
                    key={index.toString()}
                    style={[
                      {
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: index === 0 ? 0 : 11,
                      },
                      animatedStyle,
                    ]}
                  />
                );
              })}
            </View>
            <BorderlessButton
              onPress={() => {
                const x = translationX.value + width;
                if (x >= width * store.onboardingStore.pagesToArray.length) {
                  goNext();
                } else {
                  scrollRef.current?.scrollTo({
                    x,
                  });
                }
              }}>
              <Text
                style={[
                  styles.actionText,
                  {
                    color: theme.color_text_base,
                  },
                ]}>
                NEXT
              </Text>
            </BorderlessButton>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
});

export default inject('store')(Onboarding);
