import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthenticationNavigationProp} from '..';
import {Header, useTheme} from '../../components';
import {Footer} from '../components';
import LoginForm from './LoginForm';
import LoginWith from './LoginWith';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default function Login() {
  const theme = useTheme();
  const navigation = useNavigation<AuthenticationNavigationProp<'Login'>>();
  return (
    <SafeAreaView style={styles.flex}>
      <GestureHandlerRootView style={styles.flex}>
        <View style={[styles.flex, {backgroundColor: theme.fill_body}]}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.fill_body}
          />
          <Header title="Login" />
          <View
            style={[
              styles.form,
              {
                paddingHorizontal: theme.h_spacing_xl,
              },
            ]}>
            <View>
              <LoginForm />
              <LoginWith />
            </View>
            <Footer
              label="Have’nt Account?"
              action={{
                text: 'Sign Up',
                onPress: () => {
                  navigation.push('SignUp', {
                    from: 'Login',
                  });
                },
              }}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
