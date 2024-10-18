import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {toast} from 'sonner-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {Logo, Q} from '../../assets/images';
import {RootStackParamList} from '../../types/navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handleForgotPassword = () => {
    if (email) {
      toast.success(`Instructions sent to your email`, {duration: 4000});
      setTimeout(() => {
        navigation.navigate('ConfirmationScreen');
      }, 1000);
    } else {
      toast.error('Please enter your email address.', {duration: 4000});
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.groupContainer}>
        <Image source={Q} style={styles.backgroundImage} resizeMode="contain" />
        <Text style={styles.title}>You’ve forgotten your password?</Text>
        <Input
          placeholder="Username / Email..."
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.sub}>
          Please enter your username or email address so we can send you a
          confirmation link.
        </Text>
        <Button
          variant="default"
          title="Send Confirmation Link"
          onPress={handleForgotPassword}
        />
        <View style={styles.goBack}>
          <Button
            variant="text"
            title="Back to Login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1E3445',
    position: 'relative',
  },
  groupContainer: {
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 100,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sub: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  goBack: {
    marginTop: 80,
    alignSelf: 'center',
  },
});

export default ForgotPasswordScreen;
