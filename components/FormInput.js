import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const FormInput = ({ value = '', onChangeText, placeholder, isPassword = false, isUsername }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);
  const [hasFinishedTyping, setHasFinishedTyping] = useState(false);
  const { width } = useWindowDimensions();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { width: width * 0.9 }]}>
        <TextInput
          style={[
            styles.input,
            isPassword && { paddingRight: 40 },
            isUsername && hasFinishedTyping && styles.finishedUsername,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && isPasswordVisible}
          onBlur={() => setHasFinishedTyping(true)}
          onFocus={() => setHasFinishedTyping(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Ionicons
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // This margin adds space *after* each input field
    // Reduce it from 15 to something smaller, e.g., 8 or 10
    marginBottom: 8, // Reduced from 15
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 20,
    // These margins add space *around* the input field itself within its container
    // Reduce them or remove them if container's marginBottom is sufficient
    marginTop: 5,    // Reduced from 10, or remove if not needed
    marginBottom: -120, // Reduced from 10, or remove if not needed
    height: 60, // Keep consistent height for inputs
  },
  input: {
    flex: 1,
    height: 60, // Ensure the actual input field takes up the defined height of its container
    fontFamily: 'Poppins_Medium',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
  finishedUsername: {
    paddingRight: 30,
  },
});

export default FormInput;