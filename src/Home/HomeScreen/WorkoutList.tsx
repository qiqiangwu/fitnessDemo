import React from 'react';
import {View, Text, Image, StyleSheet, ImageRequireSource} from 'react-native';
import {useTheme} from '../../components';

export type WorkoutListDataItem = {
  image: ImageRequireSource;
  title: string;
};

interface WorkoutListProps {
  data: WorkoutListDataItem[];
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 32,
  },
});

export default function WorkoutList({data}: WorkoutListProps) {
  const theme = useTheme();
  return (
    <View>
      {data.map((item, index) => {
        return (
          <View key={index}>
            <Image source={item.image} />
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  left: theme.h_spacing_m + 24,
                  top: 248,
                },
              ]}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.color_text_base_inverse,
                  },
                ]}>
                {item.title}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
