import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    if (email) {
      toast.success(`Instructions sent to ${email}`, { duration: 4000 });
    } else {
      toast.error('Please enter your email address.', { duration: 4000 });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Please enter your email address to receive password reset instructions.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Send Reset Instructions" onPress={handleForgotPassword} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  instructions: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ForgotPasswordScreen;
