// screens/OtpVerificationScreen.js
import Button from '@/components/Button'; // Assuming you have a Button component
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { router, useLocalSearchParams } from 'expo-router'; // To get params like email
import { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const OTP_LENGTH = 4; // Define the length of your OTP

const OtpVerificationScreen = ({ navigation }) => {
  // Get email from local search params if passed
  const { email: paramEmail } = useLocalSearchParams();
  const [otpEmail, setOtpEmail] = useState(paramEmail || 'mail@test.com'); // Default email for mock

  // State to hold OTP digits
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  // Refs for each TextInput to manage focus
  const otpInputRefs = useRef([]);

  useEffect(() => {
    // Optionally focus the first input when the component mounts
    otpInputRefs.current[0]?.focus();
  }, []);

const handleGoBack = () => {
  
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('index'); // or '/(tabs)/dashboard' depending on your route
    }
  
    };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text !== '' && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
    // Auto-dismiss keyboard if last digit is entered
    if (text !== '' && index === OTP_LENGTH - 1) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to clear and focus previous input
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === OTP_LENGTH) {
      console.log('Verifying OTP:', enteredOtp);
      // Implement your OTP verification logic here
      // e.g., API call to verify OTP
      alert(`OTP ${enteredOtp} verified!`);
      // On success: navigate to next screen (e.g., password reset, home)
      // router.replace('/home');
    } else {
      alert('Please enter the complete OTP.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>OTP code verification</Text>
        <View style={styles.headerIconPlaceholder} /> {/* Placeholder for consistent spacing */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
        <View style={[styles.card, { backgroundColor: COLORS.primary }]}> {/* Green card as per image */}
          <Text style={[styles.descriptionText, { color: COLORS.white }]}>
            We have sent an OTP code to your email at <Text style={styles.emailText}>{otpEmail}</Text> Enter the OTP code below to verify
          </Text>

          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (otpInputRefs.current[index] = el)}
                style={[styles.otpInput, { borderColor: COLORS.white, color: COLORS.white }]}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                caretHidden={true} // Hide blinking cursor
                textAlign="center"
                selectionColor={COLORS.white} // Set selection color for consistency
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text="Continue"
              onPress={handleVerifyOtp}
              style={{ backgroundColor: COLORS.farmInventoryOrange, width: '100%' }} // Orange button
              textStyle={{ color: COLORS.white }}
            />
          </View>
        </View>
      </ScrollView>
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
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    marginTop: 40,
  },
  headerIcon: {
    padding: SIZES.base,
  },
  headerTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
  },
  headerIconPlaceholder: {
    width: SIZES.xxl + SIZES.base * 2, // Match size of icon button
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    // The main green card will take up most of the space
  },
  card: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.padding, // Space below header
    // The image shows it filling the width
    flex: 1, // Allow card to grow to fill space
  },
  descriptionText: {
    fontSize: SIZES.large,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
    lineHeight: SIZES.large * 1.5,
    fontFamily: 'PoppinsRegular',
  },
  emailText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
    maxWidth: SIZES.width * 0.7, // Limit max width for OTP inputs
    alignSelf: 'center', // Center the OTP inputs
  },
  otpInput: {
    width: SIZES.width * 0.15, // Responsive width for each box
    height: SIZES.width * 0.15, // Keep square aspect ratio
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold',
  },
  buttonContainer: {
    // The button itself will take full width inside the card
  },
});

export default OtpVerificationScreen;