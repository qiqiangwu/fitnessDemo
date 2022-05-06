import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {oneClick, useTheme} from '../../components';

interface FooterProps {
  label: string;
  action: {
    text: string;
    onPress?: () => void;
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  link: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});

export default function Footer({
  label,
  action: {text: action, onPress},
}: FooterProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: theme.color_text_base,
          },
        ]}>{`${label} `}</Text>
      <TouchableWithoutFeedback onPress={onPress && oneClick(onPress)}>
        <Text
          style={[
            styles.link,
            {
              color: theme.brand_primary,
            },
          ]}>
          {action}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
