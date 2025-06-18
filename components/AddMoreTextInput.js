import { COLORS, SIZES } from '@/constants/ThemeColors'; // Your constants
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LabeledTextInput from './LabeledTextInput'; // Reusing our LabeledTextInput

const AddMoreTextInput = ({
  label, // Base label for each input (e.g., "Ingredient")
  placeholder, // Base placeholder (e.g., "Enter ingredient name")
  initialValues = [''], // Start with one empty input by default
  onValuesChange, // Callback to send the updated list of values to parent
  keyboardType = 'default',
  // You can pass through any other props LabeledTextInput accepts here
}) => {
  const [inputValues, setInputValues] = useState(initialValues);

  // Function to handle changes in a specific input field
  const handleChangeText = (text, index) => {
    const newValues = [...inputValues];
    newValues[index] = text;
    setInputValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues); // Notify parent of changes
    }
  };

  // Function to add a new input field
  const handleAddInput = () => {
    const newValues = [...inputValues, '']; // Add an empty string for the new input
    setInputValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues); // Notify parent of new input added
    }
  };

  // Function to remove an input field
  const handleRemoveInput = (index) => {
    const newValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newValues);
    if (onValuesChange) {
      onValuesChange(newValues); // Notify parent of removal
    }
  };

  return (
    <View style={styles.container}>
      {inputValues.map((value, index) => (
        <View key={index} style={styles.inputRow}>
          <LabeledTextInput
            label={index === 0 ? label : `${label} ${index + 1}`} // Label for first input, then numbered
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => handleChangeText(text, index)}
            keyboardType={keyboardType}
            inputStyle={inputValues.length > 1 ? styles.dynamicInput : null} // Adjust style if multiple inputs
          />
          {inputValues.length > 1 && ( // Show remove button only if more than one input
            <TouchableOpacity onPress={() => handleRemoveInput(index)} style={styles.removeButton}>
              <Ionicons name="close-circle" size={SIZES.font * 1.5} color='red' />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddInput}>
        <Ionicons name="add-circle" size={SIZES.font * 1.5} color={COLORS.white} />
        <Text style={styles.addButtonText}>Add More {label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base, // Spacing between dynamically added inputs
  },
  dynamicInput: {
    flex: 1, // Allow input to take up available space in the row
    marginRight: 1, // Space between input and remove button
  },
  removeButton: {
    padding: SIZES.base / 2,
    position: 'absolute',
    right: 0,
    top: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.base,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
  },
  addButtonText: {
    marginLeft: SIZES.base,
    fontSize: SIZES.font,
    color: COLORS.white,
    fontFamily: 'PoppinsMedium',
  },
});

export default AddMoreTextInput;