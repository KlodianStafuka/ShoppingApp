import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'default' | 'text' | 'confirm';
}

const buttonStyles: Record<string, ViewStyle> = {
  default: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirm: {
    backgroundColor: '#1DA193',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
};

const buttonTextStyles: Record<string, TextStyle> = {
  default: {
    color: '#1E3445',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirm: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
};

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'default' }) => {
  const buttonStyle = buttonStyles[variant];
  const textStyle = variant === 'text' ? buttonTextStyles.text : buttonTextStyles[variant];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {variant === 'text' && <Text style={styles.arrow}>➔</Text>}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    color: 'white',
    marginRight: 5,
    transform: [{ rotateY: '180deg' }],
  },
});

export default Button;
