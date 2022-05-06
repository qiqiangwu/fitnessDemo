import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Header,
  IRootStore,
  RootNavigationProps,
  useTheme,
} from '../../components';
import {CustomRadio} from '../components';
import {Activity} from '../stores';

const newbieIcon = require('./assets/newbie.png');
const skilledIcon = require('./assets/skilled.png');
const expertIcon = require('./assets/expert.png');

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

const ActivityPreset = ({store: {presetsStore}}: {store: IRootStore}) => {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProps<'PresetsStack'>>();
  const pickerValue = presetsStore.activity ?? 'newbie';

  const pickerHandler = (value: Activity) => {
    presetsStore.setActivity(value);
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
            Your activity
          </Text>
          <View style={styles.radioContainer}>
            <CustomRadio
              icon={newbieIcon}
              label="newbie"
              value="newbie"
              viewContainerStyle={{
                width: 86,
                height: 120,
              }}
              textContainerStyle={{
                marginTop: 88,
              }}
              selected={pickerValue === 'newbie'}
              onPress={() => pickerHandler('newbie')}
            />
            <CustomRadio
              icon={skilledIcon}
              label="skilled"
              value="skilled"
              viewContainerStyle={{
                width: 86,
                height: 120,
              }}
              textContainerStyle={{
                marginTop: 88,
              }}
              selected={pickerValue === 'skilled'}
              onPress={() => pickerHandler('skilled')}
            />
            <CustomRadio
              icon={expertIcon}
              label="expert"
              value="expert"
              viewContainerStyle={{
                width: 86,
                height: 120,
              }}
              textContainerStyle={{
                marginTop: 88,
              }}
              selected={pickerValue === 'expert'}
              onPress={() => pickerHandler('expert')}
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
              presetsStore.setFinished(true);

              navigation.replace('BottomTab');
            }}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default inject('store')(observer(ActivityPreset));
