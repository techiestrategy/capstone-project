import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

const Button = ({ text, textColor = '#fff', spaceBottom = 0, onPress }) => {
  const { width } = useWindowDimensions();
  const buttonWidth = width * 0.9;

  return (
    <View style={{ alignItems: 'center' }}>
      {/* <TouchableOpacity style={[styles.button, { width: buttonWidth }]} onPress={onPress}>
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={[styles.signInButton, { marginVertical: spaceBottom }]} onPress={onPress}>
            <Text style={[styles.signInButtonText, { color: textColor }]}>{text}</Text>
          </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  signInButton: {
    backgroundColor: '#F58634', // Orange color for Sign In button
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
