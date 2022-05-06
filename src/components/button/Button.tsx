import React, {useCallback, useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from '../theme/Theme';
import _ from 'lodash';
import { oneClick } from '../utils';

interface ButtonProps {
  label: string;
  style?: StyleProp<ViewStyle> | undefined;
  textStyle?: StyleProp<TextStyle> | undefined;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  box: {
    width: 295,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Button({
  label,
  style,
  textStyle,
  onPress,
}: ButtonProps) {
  const theme = useTheme();
  return (
    <RectButton
      style={[
        styles.box,
        {
          backgroundColor: theme.secondary_button_fill,
        },
        style,
      ]}
      onPress={
        onPress && oneClick(onPress)
      }>
      <Text style={textStyle}>{label}</Text>
    </RectButton>
  );
}
