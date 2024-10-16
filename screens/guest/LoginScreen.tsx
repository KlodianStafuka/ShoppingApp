import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../redux/store';
import { toast } from 'sonner-native';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const loginError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({ username, password }));
    } else {
      toast.error('Username and password are required.', { duration: 2000 });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!', { duration: 2000 });
      setUsername('');
      setPassword('');
      navigation.navigate('ProductListing');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (loginError) {
      toast.error('Invalid username or password.', { duration: 2000 });
    }
  }, [loginError]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
