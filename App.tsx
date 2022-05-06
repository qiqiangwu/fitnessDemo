import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  theme,
  RootNavigator,
  ThemeProvider,
  RootStore,
  hydrate,
} from './src/components';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'mobx-react';
import Reactotron from 'reactotron-react-native';
import {startOnSnapShot} from './src/components';

const App = () => {
  const store = useRef(RootStore.create({})).current;

  useEffect(() => {
    hydrate(store).then(_ => {
      SplashScreen.hide();
    });

    startOnSnapShot(store);

    if (Reactotron.trackMstNode) {
      Reactotron.trackMstNode(store);
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
