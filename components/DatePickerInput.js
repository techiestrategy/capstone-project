import { COLORS, SIZES } from '@/constants/ThemeColors'; // Your theme constants
import { Ionicons } from '@expo/vector-icons'; // For the calendar icon
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const DatePickerInput = ({
  label,
  value, // Expects a Date object or null
  onChange, // Callback when date changes, receives a Date object or null
  placeholder = 'Select date',
  minimumDate,
  maximumDate,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios'); // Keep picker open on iOS until 'Done'
    if (selectedDate) {
      onChange(selectedDate);
    } else {
      // User cancelled on Android or date cleared
      if (Platform.OS === 'android' && !selectedDate) {
        onChange(null); // Explicitly clear if cancelled on Android
      }
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return placeholder;
    }
    // Format: DD/MM/YYYY
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
        <Text style={[styles.inputText, !value && styles.placeholderText]}>
          {formatDate(value)}
        </Text>
        <Ionicons
          name="calendar-outline" // Calendar icon
          size={SIZES.large}
          color={COLORS.farmInventoryDarkGray}
        />
      </TouchableOpacity>

      {showPicker && Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showPicker}
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.iosPickerContainer}>
            <View style={styles.iosPickerHeader}>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.iosPickerButton}>
                <Text style={styles.iosPickerButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.iosPickerButton}>
                <Text style={styles.iosPickerButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={value || new Date()} // Default to current date if no value
              mode="date"
              display="spinner" // or "default"
              onChange={handleDateChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          </View>
        </Modal>
      )}

      {showPicker && Platform.OS === 'android' && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default" // "calendar" on newer Android, "spinner" or "default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsMedium', // Assuming you have this font
    color: COLORS.farmInventoryDarkGray,
    marginBottom: SIZES.base / 2,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderColor: COLORS.farmInventoryDarkGray,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  inputText: {
    flex: 1,
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsRegular',
    color: COLORS.farmInventoryBlack,
  },
  placeholderText: {
    color: COLORS.farmInventoryGray,
  },
  iosPickerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  iosPickerHeader: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.padding,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.farmInventoryGray,
  },
  iosPickerButton: {
    padding: 5,
  },
  iosPickerButtonText: {
    color: COLORS.farmInventoryOrange, // Or your primary accent color
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsMedium',
  },
});

export default DatePickerInput;