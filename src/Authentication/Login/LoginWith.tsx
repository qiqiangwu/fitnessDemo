import React from 'react';
import {Image, Text, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '../../components';

const facebook = require('./assets/facebook.png');
const google = require('./assets/google.png');
const twitter = require('./assets/twitter.png');

export default function LoginWith() {
  const theme = useTheme();
  return (
    <View
      style={{
        marginTop: 32,
        paddingHorizontal: theme.h_spacing_s,
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          fontSize: 16,
          color: theme.color_text_base,
        }}>
        login with
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 21,
        }}>
        <View
          style={{
            width: 85,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#3B5998',
            borderRadius: theme.border_radius_m,
          }}>
          <Image source={facebook} />
        </View>
        <Shadow
          viewStyle={{alignSelf: 'stretch'}}
          distance={5}
          startColor={theme.color_shadow}
          finalColor={'transparent'}
          offset={[0, 1]}>
          <View
            style={{
              width: 85,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.fill_base,
              borderRadius: theme.border_radius_m,
            }}>
            <Image source={google} />
          </View>
        </Shadow>
        <View
          style={{
            width: 85,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00ACED',
            borderRadius: theme.border_radius_m,
          }}>
          <Image source={twitter} />
        </View>
      </View>
    </View>
  );
}
