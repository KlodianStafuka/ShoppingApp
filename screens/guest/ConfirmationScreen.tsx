import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Button from '../../components/Button';
import {Logo, Q} from '../../assets/images';
import {RootStackParamList} from '../../types/navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';

type ConfirmationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmationScreen'
>;

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Image source={Q} style={styles.backgroundImage} resizeMode="contain" />

      <View style={styles.goBack}>
        <Button
          variant="text"
          title="Go home"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <View style={styles.groupContainer}>
        <Text style={styles.sub}>
          A confirmation link has been sent to your email. Please check your
          inbox and follow the instructions to reset your password.
        </Text>
        <Button
          variant="confirm"
          title="Confirmation Link Sent"
          onPress={() => navigation.navigate('Login')}
        />
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
    bottom: 150,
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
    marginBottom: 40,
    alignSelf: 'center',
  },
});

export default ConfirmationScreen;
