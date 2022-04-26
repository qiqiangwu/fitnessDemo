import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
  ScrollView,
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
  useDerivedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import OnboardingScrollItem from './OnboardingScrollItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FBFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 17,
    paddingHorizontal: 20,
    marginBottom: 33,
  },
  indicatorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(172,115,255,0.4)',
  },
});

const assets = [
  require('./assets/1.png'),
  require('./assets/2.png'),
  require('./assets/3.png'),
];

const data = [
  {
    title: 'Track you routine',
    description: 'You can track it all with our intuitive interface',
    image: assets[0],
  },
  {
    title: 'Start doing sports',
    description:
      'Exercise can improve your stability and also what is called your kinesthetic awarness"',
    image: assets[1],
  },
  {
    title: 'Workout routine planner',
    description:
      'Create your own workout plans personalized to your goals to help you get in shape.',
    image: assets[2],
  },
];

export default function Onboarding() {
  const translationX = useSharedValue(0);

  const {width} = useWindowDimensions();

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationX.value = event.contentOffset.x;
  });

  const scrollRef = React.createRef<Animated.ScrollView>();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" backgroundColor="#F6FBFF" />
        <Animated.ScrollView
          ref={scrollRef}
          style={{flex: 1}}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}>
          {data.map(item => (
            <OnboardingScrollItem key={item.title} {...item} />
          ))}
        </Animated.ScrollView>
        <View style={styles.footer}>
          <Text>SKIP</Text>
          <View style={styles.indicatorContainer}>
            {data.map((_, index) => {
              const animatedStyle = useAnimatedStyle(() => {
                const backgroundColor = interpolateColor(
                  translationX.value,
                  [width * (index - 1), width * index, width * (index + 1)],
                  [
                    'rgba(172,115,255,0.4)',
                    'rgba(172,115,255,1)',
                    'rgba(172,115,255,0.4)',
                  ],
                );
                return {
                  backgroundColor,
                };
              });

              return (
                <Animated.View
                  key={index.toString()}
                  style={[
                    styles.dot,
                    {
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
              scrollRef.current?.scrollTo({
                x: translationX.value + width,
              });
            }}>
            <Text>NEXT</Text>
          </BorderlessButton>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
