import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchProps {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginEnd: 20,
    borderRadius: 10,
    color: '#1E3445',
  },
});

export default Search;
