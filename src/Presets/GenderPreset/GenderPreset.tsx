import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Gender, PresetsNavigationProps} from '..';
import {Button, Header, useTheme} from '../../components';
import {IRootStore} from '../../components';
import {CustomRadio} from '../components';

const femaleIcon = require('./assets/female.png');
const maleIcon = require('./assets/male.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    letterSpacing: 0.21,
  },
  radioContainer: {
    marginTop: 48,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const GenderPreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const theme = useTheme();
  const navigation = useNavigation<PresetsNavigationProps<'GenderPreset'>>();
  const pickerValue = presetsStore.gender ?? 'female';

  const pickerHandler = (gender: Gender) => {
    presetsStore.setGender(gender);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: theme.fill_body}}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.fill_body} />
        <Header />
        <View
          style={[
            styles.container,
            {
              paddingHorizontal: theme.h_spacing_xl,
            },
          ]}>
          <Text
            style={[
              styles.title,
              {
                color: theme.color_text_base,
              },
            ]}>
            What’s Your Gender?
          </Text>
          <View style={styles.radioContainer}>
            <CustomRadio
              icon={femaleIcon}
              label="female"
              value="female"
              viewContainerStyle={{
                width: 120,
                height: 120,
              }}
              textContainerStyle={{
                marginTop: 88,
              }}
              selected={pickerValue === 'female'}
              onPress={() => pickerHandler('female')}
            />
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                letterSpacing: 0.126,
                fontFamily: 'Montserrat-SemiBold',
              }}>
              or
            </Text>
            <CustomRadio
              icon={maleIcon}
              label="male"
              value="male"
              viewContainerStyle={{
                width: 120,
                height: 120,
              }}
              textContainerStyle={{
                marginTop: 88,
              }}
              selected={pickerValue === 'male'}
              onPress={() => pickerHandler('male')}
            />
          </View>
          <Button
            label="Continue"
            style={{
              backgroundColor: theme.brand_secondary,
              marginTop: 79,
            }}
            textStyle={{
              color: theme.color_text_base_inverse,
            }}
            onPress={() => {
              navigation.push('GoalPreset');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(GenderPreset));
