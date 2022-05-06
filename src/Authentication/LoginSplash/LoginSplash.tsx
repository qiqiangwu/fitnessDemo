import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, Image, View, StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Button, useTheme} from '../../components';
import {AuthenticationNavigationProp} from '../navigation';
import _ from 'lodash';

const dumbbell = require('./assets/dumbbell.png');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    marginTop: 80,
  },
  info: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginTop: 18,
    textAlign: 'center',
  },
});

export default function LoginSplash() {
  const theme = useTheme();
  const navigation =
    useNavigation<AuthenticationNavigationProp<'LoginSplash'>>();
  return (
    <GestureHandlerRootView style={styles.flex}>
      <View style={styles.flex}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <LinearGradient
          style={{flex: 1}}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={[theme.splash_fill, theme.brand_primary]}>
          <View
            style={[
              styles.container,
              {
                paddingHorizontal: theme.h_spacing_xl,
              },
            ]}>
            <Image source={dumbbell} />
            <Text
              style={[
                styles.title,
                {
                  color: theme.color_text_base_inverse,
                },
              ]}>
              Run&Fit UI Kit
            </Text>
            <Text
              style={[
                styles.info,
                {
                  color: theme.color_text_base_inverse,
                },
              ]}>
              RunFit App UI KIT is Flat, minimal fitness app with lots of cool
              features
            </Text>
            <View style={{marginTop: 179, alignItems: 'center'}}>
              <Button
                label="Login"
                style={{backgroundColor: 'transparent'}}
                textStyle={{
                  color: theme.color_text_base_inverse,
                }}
                onPress={() => {
                  navigation.push('Login');
                }}
              />
            </View>
            <View style={{marginTop: 12, alignItems: 'center'}}>
              <Button
                label="Sign Up"
                textStyle={{
                  color: theme.brand_primary,
                }}
                onPress={() => {
                  navigation.push('SignUp');
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
    </GestureHandlerRootView>
  );
}
