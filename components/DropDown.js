import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '@/constants/ThemeColors';

const DropDown = ({
  label,
  placeholder,
  selectedValue,
  options,
  onSelect,
  getOptionLabel = (option) => option.name,
  getOptionKey = (option) => option.id,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelectOption = (option) => {
    onSelect(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setDropdownVisible(true)}>
        <Text style={selectedValue ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
          {selectedValue ? getOptionLabel(selectedValue) : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={SIZES.font} color={COLORS.gray} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isDropdownVisible}
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={getOptionKey(option)}
                  style={styles.modalOption}
                  onPress={() => handleSelectOption(option)}
                >
                  <Text style={styles.modalOptionText}>
                    {getOptionLabel(option)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.base,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold',
  },
  dropdownTrigger: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTextPlaceholder: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    fontFamily: 'PoppinsMedium',
  },
  dropdownTextSelected: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    width: '80%',
    maxHeight: '50%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOption: {
    paddingVertical: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalOptionText: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium',
  },
});

export default DropDown;