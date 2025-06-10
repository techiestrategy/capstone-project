import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const Button = ({ text, textColor = '#fff', onPress }) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9;

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={onPress}>
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: 60,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 40,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Poppins_Medium',
  },
});
