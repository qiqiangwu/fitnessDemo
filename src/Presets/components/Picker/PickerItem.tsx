import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useTheme} from '../../../components';
import {VisibleSizeItem} from './Picker';

export type PickerValueType = string | number | undefined;

export interface PickerDataItem {
  label: string;
  value: PickerValueType;
}

type PickerItemProps = {
  index: number;
  item: PickerDataItem;
  itemStyle?: StyleProp<ViewStyle>;
  translateX: SharedValue<number>;
  selectedIndex: SharedValue<number>;
  itemWidth: number;
  offsetList: number[];
  visibleSize: VisibleSizeItem[];
  gap: number;
};

export default function PickerItem({
  index,
  item,
  itemStyle,
  translateX,
  selectedIndex,
  itemWidth: defaultItemWidth,
  offsetList,
  visibleSize,
  gap,
}: PickerItemProps) {
  const theme = useTheme();
  const middle = Math.floor((visibleSize.length ?? 0) / 2);

  const viewAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      visibleSize.map((_, i) => {
        const offset = i - middle;
        return offsetList[index - offset];
      }),
      visibleSize.map(item => item.width + gap),
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    return {
      width,
    };
  });
  const animatedStyles = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translateX.value,
      visibleSize.map((_, i) => {
        const offset = i - middle;
        return offsetList[index - offset];
      }),
      [16, 24, 36, 24, 16],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    const opacity = interpolate(
      translateX.value,
      visibleSize.map((_, i) => {
        const offset = i - middle;
        return offsetList[index - offset];
      }),
      [0.2, 0.4, 1, 0.4, 0.2],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );

    return {
      fontSize,
      opacity,
      color:
        selectedIndex.value === index
          ? theme.color_text_base_inverse
          : theme.brand_secondary,
    };
  });

  return (
    <Animated.View
      key={item.value}
      style={[
        itemStyle,
        {
          width: defaultItemWidth + gap,
          justifyContent: 'center',
          alignItems: 'center',
        },
        viewAnimatedStyle,
      ]}>
      <Animated.Text
        style={[
          {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
            letterSpacing: 0.378,
          },
          animatedStyles,
        ]}>
        {item.label}
      </Animated.Text>
    </Animated.View>
  );
}
