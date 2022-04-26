import React from 'react';
import {
  View,
  Text,
  ImageRequireSource,
  Image,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';

interface OnboardingScrollItemProps {
  title: string;
  description: string;
  image: ImageRequireSource;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 100,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 462,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: '#444444',
  },
  description: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#444444',
  },
});

export default function OnboardingScrollItem({
  title,
  description,
  image,
}: OnboardingScrollItemProps) {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <View style={[StyleSheet.absoluteFill, styles.imageContainer]}>
        <Image source={image} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
