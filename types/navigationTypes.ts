import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  ProductListing: undefined;
  ForgotPassword: undefined;
  ConfirmationScreen: undefined;
  Login: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>; // Optional if you want to define it
