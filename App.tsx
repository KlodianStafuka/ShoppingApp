import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './redux/store';
import LoginScreen from './screens/guest/LoginScreen';
import ProductListingScreen from './screens/protected/ProductListingScreen';
import ForgotPasswordScreen from './screens/guest/ForgotPasswordScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
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
