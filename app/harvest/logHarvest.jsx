import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Checkbox } from 'expo-checkbox';


const FarmFormScreen = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isFarmDropdownVisible, setFarmDropdownVisible] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedCropTypes, setSelectedCropTypes] = useState([]);
  const [notes, setNotes] = useState('');

  const farmNames = [
    { id: '1', name: 'Zara Village Farm' },
    { id: '2', name: 'Green Valley Gardens' },
    { id: '3', name: 'Sunny Side Fields' },
    { id: '4', name: 'Riverbend Orchards' },
  ];

  const cropTypes = ['Grains', 'Fruits', 'Vegetables', 'Legumes', 'Others'];

  const handleCheckboxChange = (type) => {
    setSelectedCropTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((item) => item !== type)
        : [...prevSelected, type]
    );
  };

  const handleFarmSelect = (farm) => {
    setSelectedFarm(farm);
    setFarmDropdownVisible(false);
  };

  const handleSubmit = () => {
    console.log('Selected Farm:', selectedFarm ? selectedFarm.name : 'None');
    console.log('Quantity:', quantity);
    console.log('Unit:', unit);
    console.log('Crop Types:', selectedCropTypes);
    console.log('Notes:', notes);
  };

  const router = useRouter();
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.mainContainer}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Log New Harvest</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>

            <Text style={styles.label}>Select Farm Name</Text>
            <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setFarmDropdownVisible(true)}>
              <Text style={selectedFarm ? styles.dropdownTextSelected : styles.dropdownTextPlaceholder}>
                {selectedFarm ? selectedFarm.name : 'Select farm name'}
              </Text>
              <Ionicons name="chevron-down" size={SIZES.font} color={COLORS.gray} />
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={isFarmDropdownVisible}
              onRequestClose={() => setFarmDropdownVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setFarmDropdownVisible(false)}
              >
                <View style={styles.modalContent}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {farmNames.map((farm) => (
                      <TouchableOpacity
                        key={farm.id}
                        style={styles.modalOption}
                        onPress={() => handleFarmSelect(farm)}
                      >
                        <Text style={styles.modalOptionText}>
                          {farm.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>

            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter quantity"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={setQuantity}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Unit</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., KG, L"
                  placeholderTextColor={COLORS.gray}
                  keyboardType="default"
                  value={unit}
                  onChangeText={setUnit}
                />
              </View>
            </View>

            <Text style={[styles.label, styles.checkboxGroupLabel]}>Select Crop Types</Text>
            <View style={styles.checkboxGroup}>
              {cropTypes.map((type, index) => (
                <View key={index} style={styles.checkboxItem}>
                  <Checkbox
                    value={selectedCropTypes.includes(type)}
                    onValueChange={() => handleCheckboxChange(type)}
                    color={selectedCropTypes.includes(type) ? COLORS.primary : COLORS.white}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{type}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any additional notes"
              placeholderTextColor={COLORS.gray}
              multiline={true}
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Save Item</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default FarmFormScreen

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.medium,
  },
  backButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    width: SIZES.xxl,
    height: SIZES.xxl,
    borderRadius: SIZES.xxl / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.h1 + 3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: SIZES.margin,
    fontFamily: 'PoppinsBold'
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  logo: {
    width: 150,
    height: 50,
  },
  formScrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: SIZES.topRadius,
    borderTopRightRadius: SIZES.topRadius,
    padding: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.base,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold'
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
    fontFamily: 'PoppinsMedium'
  },
  dropdownTextSelected: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium'
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
    fontFamily: 'PoppinsMedium'
  },
  modalCloseButton: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
  },
  input: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.margin,
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.margin,
  },
  inputGroup: {
    flex: 1,
    marginRight: SIZES.base,
  },
  checkboxGroupLabel: {
    marginTop: SIZES.margin / 2,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.margin,
    justifyContent: 'space-between',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: SIZES.base,
  },
  checkbox: {
    borderRadius: SIZES.base / 2,
    marginRight: SIZES.base,
    width: SIZES.medium,
    height: SIZES.medium,
  },
  checkboxLabel: {
    fontSize: SIZES.font,
    color: COLORS.black,
    fontFamily: 'PoppinsMedium'
  },
  notesInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    marginBottom: SIZES.margin,
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    minHeight: 100,
    textAlignVertical: 'top',
    fontFamily: 'PoppinsMedium'
  },
  submitButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.medium,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontFamily: 'PoppinsMedium'
  },
})