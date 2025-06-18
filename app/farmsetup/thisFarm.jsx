import AddMoreTextInput from '@/components/AddMoreTextInput';
import HeaderWithBackCard from '@/components/HeaderWithBackCard';
import InventoryForm from '@/components/InventoryForm';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// Dummy data...
const dummyFarmNames = [
{ id: '1', name: 'Zara Village Farm' },
    { id: '2', name: 'Green Valley Gardens' },
    { id: '3', name: 'Sunny Side Fields' },
    { id: '4', name: 'Riverbend Orchards' },
];

const dummyCatNames = [
  { id: '1', name: 'Cassava' },
  { id: '2', name: 'Maize' },
  { id: '3', name: 'Watermelon' },
  { id: '4', name: 'Orange' },
  { id: '5', name: 'Cucumber' },
];

const dummyStatusNames = [
  { id: '1', name: 'In Stock / Available' },
  { id: '2', name: 'Reserved / Allocated' },
  { id: '3', name: 'On Order / Incoming' },
  { id: '4', name: 'Backordered' },
  { id: '5', name: 'Out of Stock / Unavailable' },
  { id: '6', name: 'Damaged' },
  { id: '7', name: 'In Transit' },
  { id: '8', name: 'Under Inspection / Quality Check' },

];

const InventoryScreen = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [description, setDescription] = useState('');
  const [secondaryDescription, setSecondaryDescription] = useState('');

  const [tertiaryDescription, setTertiaryDescription] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
   const [farmAdminDescription, setfarmAdminDescription] = useState('');
   const [phoneAdminDescription, setphoneAdminDescription] = useState('');

  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notes, setNotes] = useState('');
  const [dynamicItems, setDynamicItems] = useState(['']);
  const [breedItems, setBreedItems] = useState(['']);
  const [selectedDate, setSelectedDate] = useState(null);

  const [farmLabelInv, setFarmLabelInv] = useState('Select Farm to Log Harvest');
  const [categoryLabelInv, setCategoryLabelInv] = useState('What we Harvest');
  const [statusLabelInv, setStatusLabelInv] = useState('Select Status');
  

  const handleFarmSelect = (farm) => {
    setSelectedFarm(farm);
    // You'd typically update farmLabelInv here based on the farm object.
    // For example: setFarmLabelInv(farm ? `Farm: ${farm.name}` : 'Select Farm for Inventory');
  };
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // You'd typically update categoryLabelInv here based on the category object.
    // For example: setCategoryLabelInv(category ? `Category: ${category.name}` : 'Inventory Category');
  };
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    // You'd typically update categoryLabelInv here based on the category object.
    // For example: setCategoryLabelInv(category ? `Category: ${category.name}` : 'Inventory Category');
  };
  const handleDynamicItemsChange = (newItems) => {
    setDynamicItems(newItems);
  };
  const handleBreedItemsChange = (newBreedItems) => {
    setBreedItems(newBreedItems);
  };

  const handleDateChange = (date) => { setSelectedDate(date); };

  const handleSubmit = () => {
    router.push('(tabs)')
    console.log('Setup Completed!', {
      //selectedFarm, // Uncomment if you want to log it
      //selectedDate: selectedDate?.toISOString(),
      locationDescription,
      farmAdminDescription,
      phoneAdminDescription,
      //description,
      //secondaryDescription,
      //quantity,
      //unit,
      //selectedCategory, // Uncomment if you want to log it
      //selectedStatus, // Uncomment if you want to log it
      notes,
      dynamicItems,
      breedItems,
    });
    // Reset all states
    setSelectedFarm(null);
    setSelectedDate(null);
    setDescription('');
    setSecondaryDescription('');
    setLocationDescription('');
    setfarmAdminDescription('');
    setphoneAdminDescription('');
    setQuantity('');
    setUnit('');
    setNotes('');
    setSelectedCategory(null);
    setSelectedStatus(null);
    setDynamicItems(['']);
    setBreedItems(['']);
    setFarmLabelInv('Select Farm to Log Harvest');
    setCategoryLabelInv('What we Harvest');
    setStatusLabelInv('Select Status');
  };
  const router = useRouter();

  // Calculate keyboardVerticalOffset for iOS.
  // This value should be the height of your fixed header + any top padding/safe area.
  // Assuming HeaderWithBackCard is 60px height + 30px spaceTop, and SafeAreaView adds its own padding.
  // You might need to adjust this value through trial and error on iOS devices.
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 + (SIZES.padding * 2) : 0; // Example: 60 (header) + 30 (spaceTop) + some SafeArea/padding

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header is outside KeyboardAvoidingView because it's fixed */}
      <HeaderWithBackCard title="Set Up Your Farm." spaceTop={30} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView} // Apply flex: 1 here
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset} // Crucial for iOS
      >
        <ScrollView
          contentContainerStyle={styles.formScrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Helps with dismissing keyboard on tap outside
        >
          <View style={styles.formContainer}>
            <InventoryForm
              //farmNames={dummyFarmNames} // Re-enabled for demonstration, assuming you want them
              selectedFarm={selectedFarm}
              onSelectFarm={handleFarmSelect}
              farmDropdownLabel={farmLabelInv}
              //catNames={dummyCatNames} // Re-enabled for demonstration
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}

              locationProps={{
                label: 'Location', // Label for the new field
                placeholder: 'e.g., location',
                value: locationDescription,
                onChangeText: setLocationDescription,
                //multiline: true, // This field can be multiline
                numberOfLines: 1,
              }}

              farmAdminProps={{
                label: 'Farm Admin Name', // Label for the new field
                placeholder: 'e.g., John',
                value: farmAdminDescription,
                onChangeText: setfarmAdminDescription,
                //multiline: true, // This field can be multiline
                numberOfLines: 1,
              }}

              phoneNumberProps={{
                label: 'Farm Admin Phone Number', // Label for the new field
                placeholder: 'e.g., 080123456789',
                value: phoneAdminDescription,
                onChangeText: setphoneAdminDescription,
                //multiline: true, // This field can be multiline
                numberOfLines: 1,
              }}

              categoryDropdownLabel={categoryLabelInv}
               //statusNames={dummyStatusNames} // Re-enabled for demonstration
              selectedStatus={selectedStatus}
              onSelectStatus={handleStatusSelect}
              statusDropdownLabel={statusLabelInv}
              description={description}
              onDescriptionChange={setDescription}
              showMainDescription={false}
              secondaryDescriptionProps={{
                label: 'Whats your Farm Name?',
                placeholder: 'e.g., enter farm name',
                value: secondaryDescription,
                onChangeText: setSecondaryDescription,
                //numberOfLines: 4,
              }}

              
              //secondaryDescriptionProps={null}
              additionalDescriptionContent={
                <AddMoreTextInput
                  label="What we Plant?"
                  placeholder="Enter what is cultivated this farm"
                  initialValues={dynamicItems}
                  onValuesChange={handleDynamicItemsChange}
                />
              }
              //additionalDescriptionContent={null}

              //secondAdditionalDescriptionContent={null}
              secondAdditionalDescriptionContent={
                <AddMoreTextInput
                  label="What we Breed?"
                  placeholder="Enter livestocks breed on this farm"
                  initialValues={breedItems}
                  onValuesChange={handleBreedItemsChange}
                />
              }
              showQuantityAndUnit={false}
              quantity={quantity}
              onQuantityChange={setQuantity}
              unit={unit}
              onUnitChange={setUnit}
              notes={notes}
              onNotesChange={setNotes}
              onSubmit={handleSubmit}
              submitButtonText="Finish Setup"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // SafeAreaView should typically take full height
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingView: {
    flex: 1, // Crucial for KeyboardAvoidingView to take available space
  },
  formScrollViewContent: {
    flexGrow: 1, // Allows content to grow and be scrollable
    // No explicit padding bottom here if formContainer handles it
  },
  formContainer: {
    flexGrow: 1, // Allows the form container to expand
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: SIZES.topRadius,
    borderTopRightRadius: SIZES.topRadius,
    padding: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding,
    paddingBottom: '20%', // Ensure ample padding at the bottom for keyboard push-up
  },
});

export default InventoryScreen;