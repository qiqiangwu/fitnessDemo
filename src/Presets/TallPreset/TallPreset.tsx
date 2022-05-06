import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useCallback, useRef} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useTheme, Button, Header, IRootStore} from '../../components';
import {PickerValueType, Picker, PickerDataItem} from '../components';
import {PresetsNavigationProps} from '../navigation';

const tallArrange: PickerDataItem[] = [];
for (let start = 144; start < 191; start++) {
  tallArrange.push({
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

const TallPreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const navigation = useNavigation<PresetsNavigationProps<'TallPreset'>>();
  const theme = useTheme();
  const pickerValue = useRef<PickerValueType>(presetsStore.tall ?? 146);
  const pickerSelectHandler = useCallback(
    value => {
      pickerValue.current = value;

      presetsStore.setTall(value);
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
            How tall are you?
          </Text>
          <View
            style={{
              marginTop: 48,
              alignSelf: 'stretch',
              height: 60,
            }}>
            <Picker
              data={tallArrange}
              defaultValue={pickerValue.current}
              itemWidth={72}
              itemStyle={{
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visibleSize={[
                {
                  width: 27,
                  height: 20,
                },
                {
                  width: 40,
                  height: 29,
                },
                {
                  width: 65,
                  height: 44,
                },
                {
                  width: 40,
                  height: 29,
                },
                {
                  width: 27,
                  height: 20,
                },
              ]}
              onSelect={pickerSelectHandler}
              union="cm"
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
              console.log(`tall: ${pickerValue.current}`);
              navigation.push('WeightPreset');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(TallPreset));
