import { COLORS, SIZES } from '@/constants/ThemeColors';
import { StyleSheet, TextInput, View } from 'react-native';
import Label from './Label';

const LabeledTextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'center', // Default for single line
  inputStyle, // For custom styling on the TextInput itself (e.g., notes)
}) => {
  const isNotesInput = multiline || numberOfLines > 1;

  return (
    <View style={styles.container}>
      <Label>{label}</Label>
      <TextInput
        style={[
          styles.input,
          isNotesInput && styles.notesInputBase, // Apply base notes style if it's a multiline input
          inputStyle, // Apply custom style overrides
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={isNotesInput ? 'top' : textAlignVertical} // Align text to top for multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin,
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base * 1.5,
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium',
    
  },
  notesInputBase: {
    paddingVertical: SIZES.medium, // Override vertical padding for notes
    minHeight: 100, // Enforce a minimum height for multiline notes
  },
});

export default LabeledTextInput;