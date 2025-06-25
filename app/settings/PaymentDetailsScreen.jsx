// screens/PaymentDetailsScreen.js
import Button from '@/components/Button'; // Assuming you have a Button component
import CreditCardInput from '@/components/CreditCardInput'; // New component
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { router, useLocalSearchParams } from 'expo-router'; // To get params like plan amount
import { useState } from 'react';
import {
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Enable LayoutAnimation for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const PaymentDetailsScreen = ({ navigation }) => {
  // Use useLocalSearchParams to get route parameters if passed from previous screen
  //const { planPrice, planName } = useLocalSearchParams();
  const { planPrice } = useLocalSearchParams();
  const amountToPay = planPrice ? parseFloat(planPrice) : 5000; // Default to ₦5,000 if no price passed

  const [creditCardExpanded, setCreditCardExpanded] = useState(true); // Credit card section expanded by default

const handleGoBack = () => {
  
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('index'); // or '/(tabs)/dashboard' depending on your route
    }
  
    };

  const toggleCreditCardSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation
    setCreditCardExpanded(!creditCardExpanded);
  };

  const handlePay = () => {
    // Implement payment logic here (e.g., submit card details to a payment gateway)
    console.log(`Attempting to pay ₦${amountToPay.toLocaleString()}`);
    alert(`Payment of ₦${amountToPay.toLocaleString()} initiated!`);
    // After successful payment, navigate to a success screen or back to dashboard
    // router.push('/payment/success');
  };

  const handlePayPal = () => {
    console.log('Initiating PayPal payment...');
    alert('Redirecting to PayPal for payment!');
    // Implement navigation to PayPal WebView or SDK
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>Payment details</Text>
        <View style={styles.headerIconPlaceholder} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Credit Card Section */}
        <TouchableOpacity
          style={[styles.paymentSectionHeader, { backgroundColor: COLORS.primary }]} // Green background for header
          onPress={toggleCreditCardSection}
          activeOpacity={0.8}
        >
          <View style={styles.paymentMethodTitle}>
            <Ionicons name="card-outline" size={SIZES.large} color={COLORS.white} />
            <Text style={[styles.paymentMethodText, { color: COLORS.white }]}>Credit card</Text>
          </View>
          <Ionicons
            name={creditCardExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={SIZES.large}
            color={COLORS.white}
          />
        </TouchableOpacity>

        {creditCardExpanded && (
          <View style={[styles.paymentSectionContent, { backgroundColor: COLORS.white }]}>
            <CreditCardInput />
          </View>
        )}

        {/* PayPal Section */}
        <TouchableOpacity
          style={[styles.paypalButton, { backgroundColor: COLORS.white, borderColor: COLORS.borderColor }]}
          onPress={handlePayPal}
          activeOpacity={0.8}
        >
          <View style={styles.paymentMethodTitle}>
            <Ionicons name="logo-paypal" size={SIZES.large} color={COLORS.black} />
            <Text style={[styles.paymentMethodText, { color: COLORS.black }]}>PayPal</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={SIZES.large} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Pay Button */}
        <View style={styles.payButtonContainer}>
          <Button
            text={`Pay ₦${amountToPay.toLocaleString()}`}
            onPress={handlePay}
            style={{ backgroundColor: COLORS.farmInventoryGreen, width: '100%' }} // Green button
            textStyle={{ color: COLORS.white }}
          >
            <Ionicons name="lock-closed-outline" size={SIZES.large} color={COLORS.white} style={styles.payButtonIcon} />
            <Text style={{ color: COLORS.white, fontSize: SIZES.large, fontWeight: 'bold' }}>
              Pay ₦{amountToPay.toLocaleString()}
            </Text>
          </Button>
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
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  paymentSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.base, // Gap between header and content or next section
    // Background color handled inline based on COLORS.primary
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentMethodTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    marginLeft: SIZES.base,
    fontFamily: 'PoppinsMedium',
  },
  paymentSectionContent: {
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    // Background color handled inline based on COLORS.white
  },
  paypalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginTop: SIZES.padding, // Space after credit card section
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  payButtonContainer: {
    marginTop: SIZES.padding * 2,
  },
  payButtonIcon: {
    marginRight: SIZES.base, // Space between icon and text if Button supports children
  },
});

export default PaymentDetailsScreen;