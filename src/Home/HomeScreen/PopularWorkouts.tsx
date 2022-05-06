import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageRequireSource,
  Image,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '../../components';

export type PopularWorkoutDataItem = {
  title: string;
  duration: string;
  image: ImageRequireSource;
};

interface PopularWorkoutsProps {
  data: PopularWorkoutDataItem[];
}

const styles = StyleSheet.create({
  category: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  card: {
    marginRight: 16,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingTop: 14.5,
    paddingBottom: 26,
  },
  cardTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    letterSpacing: 0.147,
  },
  cardDuration: {
    fontFamily: 'Montserrat-Light',
    fontSize: 10,
    letterSpacing: 0.105,
    marginTop: 14,
  },
});

export default function PopularWorkouts({data}: PopularWorkoutsProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        marginTop: 10,
      }}>
      <View
        style={{
          paddingLeft: theme.h_spacing_xl,
        }}>
        <Text
          style={[
            styles.category,
            {
              color: theme.color_text_base,
            },
          ]}>
          Popular Workouts
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 15,
        }}>
        <View
          style={{
            paddingHorizontal: theme.h_spacing_xl,
            flexDirection: 'row',
          }}>
          {data.map((item, index) => {
            return (
              <Shadow
                key={index}
                distance={10}
                offset={[0, 5]}
                startColor={theme.color_shadow}
                finalColor="transparent"
                viewStyle={{
                  alignSelf: 'stretch',
                  marginBottom: 15,
                }}>
                <View
                  style={[
                    styles.card,
                    {
                      borderRadius: theme.border_radius_m,
                      overflow: 'hidden',
                      backgroundColor: theme.fill_base,
                    },
                  ]}>
                  <Image source={item.image} style={{width: '100%'}} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDuration}>{item.duration}</Text>
                  </View>
                </View>
              </Shadow>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
