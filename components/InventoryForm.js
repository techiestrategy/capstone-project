import { COLORS, SIZES } from '@/constants/ThemeColors';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import DatePickerInput from './DatePickerInput'; // Ensure this is also imported if you plan to use datePickerProps
import Dropdown from './DropDown';
import LabeledTextInput from './LabeledTextInput';

const InventoryForm = ({
  farmNames,
  selectedFarm,
  onSelectFarm,
  description,
  onDescriptionChange,
  showMainDescription = true,
  secondaryDescriptionProps,
  tertiaryDescriptionProps,
  // NEW PROPS for specific fields
  locationProps,
  phoneNumberProps,
  emailProps,
  farmAdminProps,
  // NEW PROP for a second AddMoreTextInput
  secondAdditionalDescriptionContent,
  additionalDescriptionContent, // This is your *first* AddMoreTextInput
  quantity,
  onQuantityChange,
  unit,
  onUnitChange,
  showQuantityAndUnit = true,
  catNames,
  selectedCategory,
  onSelectCategory,
  statusNames,
  selectedStatus,
  onSelectStatus,
  showNotes = true,
  notes,
  onNotesChange,
  onSubmit,
  farmDropdownLabel,
  categoryDropdownLabel,
  statusDropdownLabel,
  submitButtonText = "Save Data",
  datePickerProps,
}) => {
  const descriptionLabel = selectedCategory
    ? `${selectedCategory.name} Description`
    : 'Inventory Description';

  return (
    <View style={styles.formContent}>
      {/* Farm Dropdown (Optional) */}
      {farmNames && (
        <Dropdown
          label={farmDropdownLabel || "Select Farm Name"}
          placeholder="Select farm name"
          selectedValue={selectedFarm}
          options={farmNames}
          onSelect={onSelectFarm}
        />
      )}

      {/* Date Picker (Optional) */}
      {datePickerProps && (
        <DatePickerInput
          label={datePickerProps.label || "Select Date"}
          value={datePickerProps.value}
          onChange={datePickerProps.onChange}
          placeholder={datePickerProps.placeholder}
          minimumDate={datePickerProps.minimumDate}
          maximumDate={datePickerProps.maximumDate}
        />
      )}

      {/* Category Dropdown (Optional) */}
      {catNames && (
        <Dropdown
          label={categoryDropdownLabel || "Select Category"}
          placeholder="Select category"
          selectedValue={selectedCategory}
          options={catNames}
          onSelect={onSelectCategory}
        />
      )}

      {/* Status Dropdown (Optional) */}
      {statusNames && (
        <Dropdown
          label={statusDropdownLabel || "Select Status"}
          placeholder="Select status"
          selectedValue={selectedStatus}
          options={statusNames}
          onSelect={onSelectStatus}
        />
      )}

      {showMainDescription && (
        <LabeledTextInput
          label={descriptionLabel}
          placeholder="Describe this item"
          value={description}
          onChangeText={onDescriptionChange}
        />
      )}

      {/* Secondary Description (Farm Name) */}
      {secondaryDescriptionProps && (
        <LabeledTextInput
          label={secondaryDescriptionProps.label || "Secondary Description"}
          placeholder={secondaryDescriptionProps.placeholder || "Enter secondary details"}
          value={secondaryDescriptionProps.value}
          onChangeText={secondaryDescriptionProps.onChangeText}
          multiline={secondaryDescriptionProps.multiline || false}
          numberOfLines={secondaryDescriptionProps.numberOfLines || 1}
        />
      )}

      {/* Tertiary Description (Additional Farm Details) */}
      {tertiaryDescriptionProps && (
        <LabeledTextInput
          label={tertiaryDescriptionProps.label || "Tertiary Description"}
          placeholder={tertiaryDescriptionProps.placeholder || "Enter more details"}
          value={tertiaryDescriptionProps.value}
          onChangeText={tertiaryDescriptionProps.onChangeText}
          multiline={tertiaryDescriptionProps.multiline || false}
          numberOfLines={tertiaryDescriptionProps.numberOfLines || 1}
        />
      )}

      {/* Location Input */}
      {locationProps && (
        <LabeledTextInput
          label={locationProps.label || "Location"}
          placeholder={locationProps.placeholder || "Enter location"}
          value={locationProps.value}
          onChangeText={locationProps.onChangeText}
          multiline={locationProps.multiline || false}
          numberOfLines={locationProps.numberOfLines || 1}
        />
      )}

      {/* Phone Number Input */}
      {phoneNumberProps && (
        <LabeledTextInput
          label={phoneNumberProps.label || "Phone Number"}
          placeholder={phoneNumberProps.placeholder || "Enter phone number"}
          value={phoneNumberProps.value}
          onChangeText={phoneNumberProps.onChangeText}
          keyboardType={phoneNumberProps.keyboardType || "phone-pad"}
        />
      )}

      {/* Email Input */}
      {emailProps && (
        <LabeledTextInput
          label={emailProps.label || "Email Address"}
          placeholder={emailProps.placeholder || "Enter email address"}
          value={emailProps.value}
          onChangeText={emailProps.onChangeText}
          keyboardType={emailProps.keyboardType || "email-address"}
          autoCapitalize="none"
        />
      )}

      {/* Farm Admin Name Input */}
      {farmAdminProps && (
        <LabeledTextInput
          label={farmAdminProps.label || "Farm Admin Name"}
          placeholder={farmAdminProps.placeholder || "Enter farm admin's name"}
          value={farmAdminProps.value}
          onChangeText={farmAdminProps.onChangeText}
        />
      )}

      {/* First AddMoreTextInput */}
      {additionalDescriptionContent}

      {/* Second AddMoreTextInput */}
      {secondAdditionalDescriptionContent}

      {/* Quantity and Unit Inputs (CONDITIONAL) */}
      {showQuantityAndUnit && (
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <LabeledTextInput
              label="Quantity"
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={onQuantityChange}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <LabeledTextInput
              label="Unit"
              placeholder="e.g., KG, L"
              value={unit}
              onChangeText={onUnitChange}
              keyboardType="default"
            />
          </View>
        </View>
      )}

      {showNotes && (<LabeledTextInput
        label="Notes"
        placeholder="Add any additional notes"
        value={notes}
        onChangeText={onNotesChange}
        multiline={true}
        numberOfLines={4}
      />
      )}

      <Button
        text={submitButtonText}
        onPress={onSubmit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContent: {
    // Styles...
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
    fontFamily: 'PoppinsMedium',
  },
});

export default InventoryForm;