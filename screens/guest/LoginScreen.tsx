import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../redux/authSlice';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../redux/store';
import {toast} from 'sonner-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CheckBox from '@react-native-community/checkbox';
import {Logo} from '../../assets/images';
import { LoginScreenNavigationProp } from '../../types/navigationTypes';


const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const loginError = useSelector((state: RootState) => state.auth.error);

  const handleLogin = () => {
    if (username && password) {
      dispatch(login({username, password}));
    } else {
      toast.error('Username and password are required.', {duration: 2000});
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Login successful!', {duration: 2000});
      setUsername('');
      setPassword('');
      navigation.navigate('ProductListing');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (loginError) {
      toast.error('Invalid username or password.', {duration: 2000});
    }
  }, [loginError]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Login to your account</Text>
      <Input
        placeholder="Username / Email..."
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={rememberMe}
          onValueChange={setRememberMe}
          style={styles.checkbox}
          boxType="square"
          tintColor="#FFFFFF"
          onTintColor="#FFFFFF"
          onCheckColor="#FFFFFF"
          tintColors={{
            true: '#FFFFFF',
            false: '#FFFFFF',
          }}
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('ForgotPassword')}>
          I forgot my password
        </Text>
      </View>
      <Button title="Sign In" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E3445',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 100,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  rememberMeText: {
    color: 'white',
    marginRight: 20,
  },
  link: {
    color: 'white',
    marginLeft: 'auto',
  },
});

export default LoginScreen;
