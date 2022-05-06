import React, {FunctionComponent} from 'react';
import {
  Image,
  ImageRequireSource,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useTheme} from '../../components';

interface CustomRadioProps {
  icon?: ImageRequireSource;
  label: string;
  value: string | number;
  onPress?: () => void;
  viewContainerStyle?: StyleProp<ViewStyle> | undefined;
  textContainerStyle?: StyleProp<ViewStyle> | undefined;
  selected: boolean;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const Wrapper: FunctionComponent<{selected: boolean}> = ({
  selected,
  children,
}) => {
  const theme = useTheme();

  if (!selected) {
    return (
      <Shadow
        viewStyle={{alignSelf: 'stretch'}}
        startColor={theme.color_shadow}
        finalColor="transparent"
        distance={15}
        offset={[0, 7]}>
        {children}
      </Shadow>
    );
  } else {
    return <>{children}</>;
  }
};

export function CustomRadio({
  icon,
  label,
  value,
  onPress,
  viewContainerStyle,
  textContainerStyle,
  selected = false,
}: CustomRadioProps) {
  const theme = useTheme();
  return (
    <Wrapper selected={selected}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View
          style={[
            styles.container,
            {
              borderRadius: theme.border_radius_m,
              backgroundColor: selected ? theme.brand_primary : theme.fill_base,
            },
            viewContainerStyle,
          ]}>
          {icon && (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -16,
                },
              ]}>
              <Image
                source={icon}
                style={{
                  tintColor: selected ? theme.fill_base : theme.brand_primary,
                }}
              />
            </View>
          )}
          <View style={textContainerStyle}>
            <Text
              style={{
                color: selected
                  ? theme.color_text_base_inverse
                  : theme.brand_primary,
                fontFamily: 'Montserrat-Regular',
                fontSize: 16,
              }}>
              {label}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Wrapper>
  );
}
