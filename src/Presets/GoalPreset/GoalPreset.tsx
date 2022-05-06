import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Header, IRootStore, useTheme} from '../../components';
import {CustomRadio} from '../components';
import {PresetsNavigationProps} from '../navigation';

const pickerData = [
  {
    label: 'Lose weight',
    value: 0,
  },
  {
    label: 'Keep fit',
    value: 1,
  },
  {
    label: 'Gain muscules',
    value: 2,
  },
];

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
  },
});

const GoalPreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const theme = useTheme();
  const navigation = useNavigation<PresetsNavigationProps>();
  const pickerValue = presetsStore.goal ?? 0;

  const pickerHandler = (goal: number) => {
    presetsStore.setGoal(goal);
  };

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
            What’s Your Goal?
          </Text>
          <View style={styles.radioContainer}>
            {pickerData.map((item, index) => {
              return (
                <View
                  key={item.value.toString()}
                  style={{
                    paddingHorizontal: theme.h_spacing_s,
                  }}>
                  <CustomRadio
                    label={item.label}
                    value={item.value}
                    viewContainerStyle={{
                      width: '100%',
                      height: 63,
                      marginTop: index === 0 ? 0 : 16,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    textContainerStyle={{
                      paddingLeft: theme.h_spacing_m,
                    }}
                    selected={pickerValue === item.value}
                    onPress={() => pickerHandler(item.value)}
                  />
                </View>
              );
            })}
          </View>
          <Button
            label="Continue"
            style={{
              backgroundColor: theme.brand_secondary,
              marginTop: 48,
            }}
            textStyle={{
              color: theme.color_text_base_inverse,
            }}
            onPress={() => {
              navigation.push('AgePreset');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(GoalPreset));
