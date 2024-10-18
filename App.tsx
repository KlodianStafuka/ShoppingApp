import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store, { AppDispatch } from './redux/store';
import LoginScreen from './screens/guest/LoginScreen';
import ProductListingScreen from './screens/protected/ProductListingScreen';
import ForgotPasswordScreen from './screens/guest/ForgotPasswordScreen';
import ConfirmationScreen from './screens/guest/ConfirmationScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { loadAuthState } from './redux/authSlice';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const dispatch = store.dispatch as AppDispatch;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadAuth = async () => {
      await dispatch(loadAuthState());
      const authState = store.getState().auth.isAuthenticated;
      setIsAuthenticated(authState);
      setIsLoading(false);
    };
    
    loadAuth();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const initialRouteName = isAuthenticated ? "ProductListing" : "Login";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ConfirmationScreen"
                component={ConfirmationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductListing"
                component={ProductListingScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <Toaster />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
