import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {Button, RootNavigationProps, useTheme} from '../../components';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {inject, observer} from 'mobx-react';
import {IRootStore} from '../../components';

const LoginForm = ({store}: {store?: IRootStore}) => {
  const theme = useTheme();
  const navigation =
    useNavigation<RootNavigationProps<'AuthenticationStack'>>();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <View style={{marginTop: 77}}>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginSchema}
        onSubmit={(values, formikHelpers) => {
          console.log({values});
          store?.loginStore.loginSuccess();

          if (store?.presetsStore.finished) {
            navigation.replace('BottomTab');
          } else {
            navigation.replace('PresetsStack', {
              screen: 'GenderPreset',
            });
          }
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <View>
            <Shadow
              viewStyle={{alignSelf: 'stretch'}}
              distance={10}
              startColor={theme.color_shadow}
              finalColor={'transparent'}
              offset={[0, 5]}>
              <View style={{height: 63}}>
                <TextInput
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize={'none'}
                  placeholderTextColor={theme.color_text_placeholder}
                  style={{
                    height: 63,
                    borderRadius: theme.border_radius_m,
                    backgroundColor: theme.fill_base,
                    paddingHorizontal: theme.h_spacing_xl,
                    color: theme.color_text_base,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                  }}
                />
                {touched.email && errors.email && (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingHorizontal: theme.h_spacing_s,
                        borderColor: theme.brand_error,
                        borderBottomWidth: 2,
                        borderRadius: theme.border_radius_m,
                      },
                    ]}
                    pointerEvents="none">
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 10,
                        color: theme.brand_error,
                      }}>
                      {errors.email}
                    </Text>
                  </View>
                )}
              </View>
            </Shadow>

            <Shadow
              containerViewStyle={{marginTop: 24}}
              viewStyle={{alignSelf: 'stretch'}}
              distance={10}
              startColor={theme.color_shadow}
              finalColor={'transparent'}
              offset={[0, 5]}>
              <View style={{height: 63}}>
                <TextInput
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                  autoCapitalize={'none'}
                  style={{
                    height: 63,
                    borderRadius: theme.border_radius_m,
                    backgroundColor: theme.fill_base,
                    paddingHorizontal: theme.h_spacing_xl,
                    color: theme.color_text_base,
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 16,
                  }}
                />
                {touched.password && errors.password && (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingHorizontal: theme.h_spacing_s,
                        borderColor: theme.brand_error,
                        borderBottomWidth: 2,
                        borderRadius: theme.border_radius_m,
                      },
                    ]}
                    pointerEvents="none">
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: 10,
                        color: theme.brand_error,
                      }}>
                      {errors.password}
                    </Text>
                  </View>
                )}
              </View>
            </Shadow>
            <Button
              style={{
                backgroundColor: theme.brand_primary,
                marginTop: 32,
              }}
              textStyle={{color: theme.color_text_base_inverse}}
              onPress={handleSubmit}
              label="Sign In"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default inject('store')(observer(LoginForm));
