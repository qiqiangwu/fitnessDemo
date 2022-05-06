import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Header, IRootStore, useTheme} from '../../components';
import {Picker} from '../components';
import {PickerValueType} from '../components/Picker';
import {PresetsNavigationProps} from '../navigation';

const ageRange = new Array(60).fill(0).map((_, index) => ({
  label: (20 + index).toString(),
  value: 20 + index,
}));

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
});

const AgePreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const navigaton = useNavigation<PresetsNavigationProps<'AgePreset'>>();
  const theme = useTheme();
  const pickerValue = useRef<PickerValueType>(presetsStore.age ?? 24);
  const pickerSelectHandler = useCallback(
    value => {
      pickerValue.current = value;

      presetsStore.setAge(value);
    },
    [pickerValue],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: theme.fill_body}}>
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
            How old are you?
          </Text>
          <View
            style={{
              marginTop: 48,
              alignSelf: 'stretch',
              height: 60,
            }}>
            <Picker
              data={ageRange}
              defaultValue={pickerValue.current}
              itemStyle={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onSelect={pickerSelectHandler}
            />
          </View>
          <Button
            label="Continue"
            style={{
              backgroundColor: theme.brand_secondary,
              marginTop: 139,
            }}
            textStyle={{
              color: theme.color_text_base_inverse,
            }}
            onPress={() => {
              console.log(`age: ${pickerValue.current}`);
              navigaton.push('TallPreset');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(AgePreset));
