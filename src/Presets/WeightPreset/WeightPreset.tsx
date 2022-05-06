import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTheme, Button, Header, IRootStore} from '../../components';
import {PickerValueType, Picker, PickerDataItem} from '../components';
import {PresetsNavigationProps} from '../navigation';

const weightArrange: PickerDataItem[] = [];
for (let start = 40; start < 100; start++) {
  weightArrange.push({
    label: start.toString(),
    value: start,
  });
}

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

const WeightPreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const navigation = useNavigation<PresetsNavigationProps<'WeightPreset'>>();
  const theme = useTheme();
  const pickerValue = useRef<PickerValueType>(presetsStore.weight ?? 64);
  const pickerSelectHandler = useCallback(
    value => {
      pickerValue.current = value;
      presetsStore.setWeight(value);
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
            How much do you weight?
          </Text>
          <View
            style={{
              marginTop: 48,
              alignSelf: 'stretch',
              height: 60,
            }}>
            <Picker
              data={weightArrange}
              defaultValue={pickerValue.current}
              itemWidth={60}
              itemStyle={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visibleSize={[
                {
                  width: 20,
                  height: 20,
                },
                {
                  width: 30,
                  height: 29,
                },
                {
                  width: 48,
                  height: 44,
                },
                {
                  width: 30,
                  height: 29,
                },
                {
                  width: 20,
                  height: 20,
                },
              ]}
              onSelect={pickerSelectHandler}
              union="kg"
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
              console.log(`weight: ${pickerValue.current}`);
              navigation.push('ActivityPreset');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(WeightPreset));
