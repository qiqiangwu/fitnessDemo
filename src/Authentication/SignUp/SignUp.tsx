import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header, useTheme} from '../../components';
import {Footer} from '../components';
import {
  AuthenticationNavigationProp,
  AuthenticationStackParamList,
} from '../navigation';
import SignUpForm from './SignUpForm';

export default function SignUp() {
  const theme = useTheme();
  const navigation = useNavigation<AuthenticationNavigationProp<'SignUp'>>();
  const route = useRoute<RouteProp<AuthenticationStackParamList, 'SignUp'>>();
  const from = useRef<'Login' | null>(null);

  useEffect(() => {
    from.current = route.params?.from ?? null;
  }, [route.params?.from]);

  const gotoLogin = () => {
    if (from.current === 'Login') {
      navigation.pop();
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: theme.fill_body}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.fill_body}
          />
          <Header title="Sign Up" />
          <View
            style={{
              flex: 1,
              paddingHorizontal: theme.h_spacing_xl,
              justifyContent: 'space-between',
              marginTop: 8,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 14,
                  color: theme.color_text_base,
                }}>
                Register via your company email to connect with the people of
                your company.
              </Text>
              <SignUpForm />
            </View>
            <Footer
              label="Already have an account?"
              action={{text: 'Log In', onPress: gotoLogin}}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
