// screens/ProfileScreen.js
import Button from '@/components/Button'; // Assuming this path
import LabeledTextInput from '@/components/LabeledTextInput'; // Assuming this path
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => { // Using 'navigation' prop for goBack
  //const { theme } = useTheme();
  //const { COLORS, SIZES } = theme;

  // State for profile fields
  const [fullName, setFullName] = useState('Garuba Ali');
  const [email, setEmail] = useState('garuba.ali@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('090########');
  const [location, setLocation] = useState('Kaduna, Nigeria');
  const [role, setRole] = useState('Farmer');

  const handleGoBack = () => {

  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('index'); // or '/(tabs)/dashboard' depending on your route
  }

  };

  const handleSaveProfile = () => {
    // Implement logic to save profile data (e.g., to an API or local storage)
    console.log('Profile Saved:', {
      fullName,
      email,
      phoneNumber,
      location,
      role,
    });
    // After saving, you might navigate back or show a success message
    // navigation.goBack();
  };

  const handleCancel = () => {
    // Reset fields to initial state or navigate back without saving
    setFullName('Garuba Ali');
    setEmail('garuba.ali@gmail.com');
    setPhoneNumber('090########');
    setLocation('Kaduna, Nigeria');
    setRole('Farmer');
    router.back();
  };

  // Keyboard Avoiding View offset calculation (similar to InventoryScreen)
  // Adjust this value based on your actual header height and safe area insets.
  const keyboardVerticalOffset = Platform.OS === 'ios' ? SIZES.height * 0.08 : 0; // Approx header height

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>Edit Profile</Text>
        <View style={styles.headerIconPlaceholder} /> 
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.profileContent}>
            {/* Profile Image */}
            <TouchableOpacity style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=68' }} // Placeholder image
                style={styles.profileImage}
              />
              {/* Optional: Add an edit icon overlay */}
              <View style={styles.editIconOverlay}>
                <Ionicons name="camera-outline" size={SIZES.medium} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            {/* Profile Fields */}
            <LabeledTextInput
              label="Full Name"
              placeholder="Enter full name"
              value={fullName}
              onChangeText={setFullName}
              editable={true} // Set to true to allow editing
              inputStyle={{ color: COLORS.darkGray }} // Apply text color
            />
            <LabeledTextInput
              label="Email Address"
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={true}
              inputStyle={{ color: COLORS.darkGray }}
            />
            <LabeledTextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={true}
              inputStyle={{ color: COLORS.darkGray }}
            />
            <LabeledTextInput
              label="Location"
              placeholder="Enter location"
              value={location}
              onChangeText={setLocation}
              editable={true}
              inputStyle={{ color: COLORS.darkGray }}
            />
            <LabeledTextInput
              label="Role/Occupation"
              placeholder="Enter role or occupation"
              value={role}
              onChangeText={setRole}
              editable={true}
              inputStyle={{ color: COLORS.darkGray }}
            />

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                text="Cancel"
                onPress={handleCancel}
                
               
                spaceInner={50}
                bgColor={'white'}
                textColor={'#00A859'}
                bColor={'#00A859'}
                borderWidth={1}
              />
              <Button
                text="Save"
                onPress={handleSaveProfile}
                
                spaceInner={50}
                
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 20,
    // borderBottomWidth: 1,
    marginTop: 20,
  },
  headerIcon: {
    padding: SIZES.base,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIconPlaceholder: {
    width: SIZES.xxl + SIZES.base * 2, // Match size of icon button
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: SIZES.padding * 2, // Ensure enough scroll space below buttons
  },
  profileContent: {
    alignItems: 'center',
    padding: SIZES.padding,
  },
  profileImageContainer: {
    width: SIZES.width * 0.35, // Responsive size for image
    height: SIZES.width * 0.35,
    borderRadius: (SIZES.width * 0.35) / 2, // Makes it circular
    overflow: 'hidden',
    marginBottom: SIZES.padding * 1.5,
    borderWidth: 2,
    borderColor: COLORS.lightGray, // Border around image
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: SIZES.base,
    right: SIZES.base,
    backgroundColor: COLORS.farmInventoryOrange,
    borderRadius: SIZES.xxl / 2, 
    padding: SIZES.base / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.white,
  },
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center', 
  width: '100%',
  marginTop: SIZES.padding * 1,
  gap: SIZES.base,                 
},
actionButton: {
  flex: 1,
  paddingVertical: 14,
  borderRadius: SIZES.radius,
  alignItems: 'center',
},
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
        paddingHorizontal: 20,

  },
  saveButton: {
    // backgroundColor handled by inline style

  },
  buttonText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;