import React, {useEffect, useState} from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../../../components';
import PickerItem, {PickerValueType, PickerDataItem} from './PickerItem';

export interface VisibleSizeItem {
  width: number;
  height: number;
}

interface PickerProps {
  gap: number;
  itemWidth: number;
  itemHeight: number;
  defaultValue: PickerValueType;
  visibleSize: VisibleSizeItem[];
  data: PickerDataItem[];
  itemStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: PickerValueType) => void;
  union?: string;
}

type GestureContext = {
  start: number;
};

export default function Picker({
  gap,
  itemWidth: ITEM_WIDTH,
  itemHeight,
  defaultValue,
  visibleSize,
  data,
  itemStyle,
  onSelect,
  union,
}: PickerProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const middleIndex = Math.ceil(visibleSize.length / 2) - 1;

  const defaultItemWidth = visibleSize[0].width;

  // index mapped tranlsateX
  const [offsetList, setOffsetList] = useState<number[]>([]);

  const getLeftVisibleWidth = (leftIndex: number) => {
    leftIndex = Math.min(leftIndex, middleIndex);

    return visibleSize
      .filter((_, index) => index < leftIndex)
      .reduce((prev, current) => prev + (current.width + gap), 0);
  };

  useEffect(() => {
    const w = visibleSize.reduce(
      (prev, current) => prev + current.width + gap,
      0,
    );
    setContainerWidth(w);

    const offsetList: number[] = [];
    data.forEach((_, index) => {
      if (index >= 0 && index <= middleIndex) {
        offsetList.push(getLeftVisibleWidth(middleIndex - index));
      } else {
        offsetList.push(-(index - middleIndex) * (defaultItemWidth + gap));
      }
    });

    // hack add a fake last
    // 修正末尾位置不正确
    offsetList.push(offsetList[offsetList.length - 1] - gap);
    setOffsetList(offsetList);

    console.log(`Picker offsetList`, offsetList);
  }, []);

  const fixTranslateX = (tx: number) => {
    'worklet';

    let fixed;
    let index = 0;

    for (let i = 0; i < offsetList.length; i += 1) {
      index = i;

      const current = offsetList[i];
      const next = offsetList[i + 1];

      if (tx === current) {
        fixed = current;
      } else if (tx === next) {
        fixed = next;

        index = i + 1;
      } else if (tx > next && tx < current) {
        const diffLeft = current - tx;
        const diffRight = tx - next;

        if (diffLeft <= diffRight) {
          fixed = current;
        } else {
          fixed = next;

          index = i + 1;
        }
      }

      if (fixed !== undefined) {
        break;
      }
    }

    return [fixed ?? tx, index];
  };

  const start = getLeftVisibleWidth(middleIndex);
  const end =
    -data.length * (defaultItemWidth + gap) +
    (middleIndex + 1) * (defaultItemWidth + gap);

  const defaultIndex = data.findIndex(item => item.value === defaultValue) ?? 0;

  const translateX = useSharedValue(0);
  const selectedIndex = useSharedValue<number>(defaultIndex);

  useEffect(() => {
    if (offsetList.length) {
      const target = offsetList[defaultIndex] ?? 0;
      if (target === 0) {
        translateX.value = 100;
      }

      translateX.value = withTiming(target, {
        duration: 200,
      });
    }
  }, [offsetList, defaultIndex]);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart(event, context) {
      context.start = translateX.value;
    },
    onActive(event, context) {
      let target = context.start + event.translationX;
      if (target > start) {
        target = start;
      } else if (target < end) {
        target = end;
      }

      translateX.value = target;
    },
    onEnd(event, context) {
      translateX.value = withDecay(
        {
          velocity: event.velocityX,
          clamp: [end, start],
        },
        () => {
          const [target, index] = fixTranslateX(translateX.value);

          console.log(`Picker onEnd() [index, target]`, [index, target]);

          translateX.value = withTiming(
            target,
            {
              duration: 300,
            },
            () => {
              selectedIndex.value = index;

              onSelect && runOnJS(onSelect)(data[index].value);
            },
          );
        },
      );
    },
  });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const theme = useTheme();

  return (
    <View
      style={{
        overflow: 'hidden',
        width: containerWidth,
        height: 60,
        alignSelf: 'center',
      }}>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            width: ITEM_WIDTH,
            height: itemHeight,
            backgroundColor: theme.brand_primary,
            borderRadius: theme.border_radius_m,
            left: (containerWidth - ITEM_WIDTH) / 2,
            alignItems: 'center',
            justifyContent: 'flex-end',
          },
        ]}>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: 10,
            color: theme.color_text_base_inverse,
            letterSpacing: 0.14,
          }}>
          {union}
        </Text>
      </View>
      <Animated.View
        style={[
          {
            flexDirection: 'row',
          },
          animatedStyle,
        ]}>
        {offsetList.length !== 0 &&
          data.map((item, index) => (
            <PickerItem
              key={index.toString()}
              index={index}
              item={item}
              itemStyle={itemStyle}
              translateX={translateX}
              selectedIndex={selectedIndex}
              itemWidth={defaultItemWidth}
              offsetList={offsetList}
              visibleSize={visibleSize}
              gap={gap}
            />
          ))}
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}></Animated.View>
      </PanGestureHandler>
    </View>
  );
}
Picker.defaultProps = {
  gap: 20,
  itemWidth: 60,
  itemHeight: 60,
  visibleSize: [
    {
      width: 24,
      height: 20,
    },
    {
      width: 32,
      height: 29,
    },
    {
      width: 46,
      height: 44,
    },
    {
      width: 32,
      height: 29,
    },
    {
      width: 24,
      height: 20,
    },
  ],
  data: [],
};
