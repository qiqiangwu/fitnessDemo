import React from 'react';
import {
  View,
  Text,
  ImageRequireSource,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '../../components';
import Color from 'color';

export type HomeSliderDataItem = {
  label: string;
  image: ImageRequireSource;
};

interface HomeSliderProps {
  data: HomeSliderDataItem[];
}

const RATIO = 200 / 375;

const styles = StyleSheet.create({
  container: {},
  image: {
    position: 'absolute',
    right: '6.51%',
  },
  labelContainer: {
    position: 'absolute',
    left: 24,
    top: 83,
  },
  label: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default function HomeSlider({data}: HomeSliderProps) {
  const {width} = Dimensions.get('window');
  const height = width * RATIO;
  const theme = useTheme();

  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const dotColor = Color(theme.indicator_fill).alpha(0.5).toString();

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          marginTop: 24,
          marginBottom: 22,
        },
      ]}>
      <Shadow
        distance={15}
        offset={[0, 7]}
        startColor={theme.color_shadow}
        finalColor="transparent"
        viewStyle={{
          alignSelf: 'stretch',
        }}>
        <View
          style={{
            height,
          }}>
          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={onScrollHandler}>
            {data.map((item, index) => (
              <LinearGradient
                colors={[theme.brand_primary, theme.splash_fill]}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                key={index}
                style={{
                  width,
                  height,
                }}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.labelContainer}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: theme.color_text_base_inverse,
                      },
                    ]}>
                    {item.label}
                  </Text>
                </View>
              </LinearGradient>
            ))}
          </Animated.ScrollView>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                top: height - 6 - 12,
                height: 6,
                justifyContent: 'center',
                flexDirection: 'row',
              },
            ]}>
            {data.map((item, index) => {
              const animatedStyle = useAnimatedStyle(() => {
                const backgroundColor = interpolateColor(
                  scrollX.value,
                  [(index - 1) * width, index * width, (index + 1) * width],
                  [dotColor, theme.indicator_fill, dotColor],
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
                      backgroundColor: dotColor,
                    },
                    animatedStyle,
                  ]}></Animated.View>
              );
            })}
          </View>
        </View>
      </Shadow>
    </View>
  );
}
