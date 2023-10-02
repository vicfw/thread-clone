import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
