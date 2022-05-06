import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthenticationStackParamList} from '../../Authentication';
import {PresetsStackParamList} from '../../Presets';
import {BottomTabParamList} from './TabNavigator';

export type RootStackParamList = {
  OnboardingStack: undefined;
  AuthenticationStack:
    | NavigatorScreenParams<AuthenticationStackParamList>
    | undefined;
  PresetsStack: NavigatorScreenParams<PresetsStackParamList> | undefined;
  BottomTab: NavigatorScreenParams<BottomTabParamList> | undefined;
};
export type RootNavigationProps<
  T extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackNavigationProp<RootStackParamList, T>;
