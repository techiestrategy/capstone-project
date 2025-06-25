// screens/SubscriptionScreen.js
import Button from '@/components/Button'; // Assuming you have a Button component
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard'; // New component
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { router } from 'expo-router';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Mock Data for Subscription Plans ---
const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 1000,
    features: [
      '5% seed discount',
      'Access to monthly magazine',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 3000,
    features: [
      '10% seed discount',
      '100/month free sms credit',
      'Access to monthly magazine (digital only)',
      'Access to Events',
      'Dedicated support (chat)',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 5000,
    features: [
      '25% seed discount',
      '300/month free sms credit',
      'Access to monthly magazine (with featured spotlight)',
      'Access to Events (vip access)',
      'Product listing priority (Top priority)',
      'Dedicated support (chat + phone)',
    ],
  },
];

const SubscriptionScreen = ({ navigation }) => {
  const [selectedPlanId, setSelectedPlanId] = useState('basic'); // Default selected plan

const handleGoBack = () => {
  
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('index'); // or '/(tabs)/dashboard' depending on your route
    }
  
    };

  const handleSelectPlan = (planId) => {
    setSelectedPlanId(planId);
  };

  const handleProceedToPayment = () => {
    const selectedPlan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlanId);
    console.log('Proceeding to payment with plan:', selectedPlan);
    //alert(`Proceeding to payment for ${selectedPlan?.name} plan (₦${selectedPlan?.price.toLocaleString()})`);
    // Implement navigation to payment screen using expo-router
     //router.push('settings/PaymentDetailsScreen', { planId: selectedPlanId });
     router.push({
    pathname: 'settings/PaymentDetailsScreen',
    params: { planPrice: selectedPlan.price.toString() }, // pass as string
  });

  //params: { planPrice: selectedPlan.price.toString(), planName: selectedPlan.name },
     
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>Select a Plan</Text>
        <View style={styles.headerIconPlaceholder} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.introText, { color: COLORS.darkGray }]}>
          Choose a monthly subscription plan for our farmventory service. cancel anytime
        </Text>

        {SUBSCRIPTION_PLANS.map((plan) => (
          <SubscriptionPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlanId === plan.id}
            onSelect={handleSelectPlan}
          />
        ))}

        <View style={styles.buttonContainer}>
          <Button
            text="Proceed to payment"
            onPress={handleProceedToPayment}
           spaceInner={70}
          />
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
    paddingBottom: SIZES.padding * 2, // Extra space at bottom
  },
  introText: {
    fontSize: SIZES.medium,
    textAlign: 'center',
    marginBottom: SIZES.padding * 1.5,
    lineHeight: SIZES.medium * 1.5,
    fontFamily: 'PoppinsRegular',
  },
  buttonContainer: {
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
});

export default SubscriptionScreen;