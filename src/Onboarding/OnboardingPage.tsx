import React from 'react';
import {
  Image,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
  ImageRequireSource,
} from 'react-native';
import {useTheme} from '../components';

interface OnboardingPageProps {
  title: string;
  description: string;
  image: ImageRequireSource;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    marginTop: 462,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
  },
  description: {
    fontFamily: 'Montserrat-Light',
    fontSize: 14,
    marginTop: 18,
  },
});

export default function OnboardingPage({
  title,
  description,
  image,
}: OnboardingPageProps) {
  const {width} = useWindowDimensions();
  const theme = useTheme();

  return (
    <View style={[styles.container, {width}]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            alignItems: 'center',
            paddingTop: 100,
          },
        ]}>
        <Image source={image} />
      </View>
      <View
        style={[
          styles.main,
          {
            paddingHorizontal: theme.h_spacing_xxl,
          },
        ]}>
        <Text
          style={[
            styles.title,
            {
              textAlign: 'center',
              color: theme.color_text_base,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            {
              textAlign: 'center',
              color: theme.color_text_base,
            },
          ]}>
          {description}
        </Text>
      </View>
    </View>
  );
}
