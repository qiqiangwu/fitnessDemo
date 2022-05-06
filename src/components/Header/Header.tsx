import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../navigation';
import {useTheme} from '../theme';
import {StyleSheet, Text, View} from 'react-native';

interface HeaderProps {
  title?: string;
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: -10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    letterSpacing: -0.98,
  },
});

export default function Header({title}: HeaderProps) {
  const theme = useTheme();
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: theme.h_spacing_xl,
        },
      ]}>
      {navigation.canGoBack() && (
        <BorderlessButton
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}>
          <Icon name="chevron-back" size={20} color={theme.color_text_base} />
        </BorderlessButton>
      )}
      <Text
        style={[
          styles.title,
          {
            color: theme.color_text_base,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}
