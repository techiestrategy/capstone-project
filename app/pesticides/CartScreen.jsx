// screens/CartScreen.js
import Button from '@/components/Button'; // Ensure you have this component
import CartItemCard from '@/components/CartItemCard';
import Dropdown from '@/components/DropDown';
import LabeledTextInput from '@/components/LabeledTextInput';
import OrderSummaryCard from '@/components/OrderSummaryCard';
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { router } from 'expo-router'; // To get params like plan amount
import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Mock Data ---
const MOCK_CART_ITEMS = [
  {
    id: 'cart1',
    name: 'Paradox',
    price: 5000,
    quantity: 1,
    imageUri: 'https://img.favpng.com/1/9/19/herbicide-paraquat-pesticide-insecticide-weed-png-favpng-0EQgehxhDxebj0AciiLN0vEPX.jpg',
  },
  {
    id: 'cart2',
    name: 'Sur Tee',
    price: 9000,
    quantity: 1,
    imageUri: 'https://ohlala-sellerie.be/cdn/shop/files/Laboratoire_LPC_-_Spray_Insecticide_Espace_X_Treme_104a731c-c6c7-40ba-ae4a-0206fe1c17b7.png?v=1730104646',
  },
];

const SHIPPING_LOCATIONS = [
  { id: 'lagos', name: 'Lagos, Nigeria' },
  { id: 'abuja', name: 'Abuja, Nigeria' },
  { id: 'kaduna', name: 'Kaduna, Nigeria' },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(MOCK_CART_ITEMS);
  const [selectedShippingLocation, setSelectedShippingLocation] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');

  // --- Calculation Logic ---
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.10; // Fixed 10% example
  };

  const calculateShippingCost = () => {
    return 3000; // Fixed amount
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const shippingCost = calculateShippingCost();
  const grandTotal = subtotal - discount + shippingCost;

  // --- Handlers ---
const handleGoBack = () => {
  
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('index'); // or '/(tabs)/dashboard' depending on your route
    }
  
    };

  const handleQuantityChange = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleProceedToCheckout = () => {
    console.log('Proceeding to Checkout:', {
      cartItems,
      selectedShippingLocation,
      shippingAddress,
      subtotal,
      discount,
      shippingCost,
      grandTotal,
    });
    alert('Proceeding to Checkout!');
  };

  // Keyboard Avoiding View offset calculation
  const keyboardVerticalOffset = Platform.OS === 'ios' ? SIZES.height * 0.08 : 0;

  const renderCartItem = ({ item }) => (
    <CartItemCard
      item={item}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>My Cart</Text>
        <View style={styles.headerIconPlaceholder} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Ionicons name="cart-outline" size={SIZES.xxxl * 2} color={COLORS.gray} />
              <Text style={[styles.emptyCartText, { color: COLORS.gray }]}>Your cart is empty.</Text>
              <TouchableOpacity onPress={() => console.log('Navigate to shopping')}>
                <Text style={[styles.continueShoppingText, { color: COLORS.farmInventoryGreen }]}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.cartListContainer}
              />

              {/* Shipping Information */}
              <View style={styles.shippingSection}>
                {/* Dropdown for Shipping Location */}
                <View style={styles.dropdownContainer}>
                    <Dropdown
                        label="Select Shipping Location"
                        placeholder="Choose location"
                        selectedValue={selectedShippingLocation}
                        options={SHIPPING_LOCATIONS}
                        onSelect={setSelectedShippingLocation}
                    />
                </View>

                {/* LabeledTextInput for Shipping Address */}
                <LabeledTextInput
                  label="Enter Shipping Address"
                  placeholder="e.g., House No, Street, City"
                  value={shippingAddress}
                  onChangeText={setShippingAddress}
                  multiline={true}
                  numberOfLines={2}
                />
              </View>

              {/* Order Summary */}
              <OrderSummaryCard
                subtotal={subtotal}
                discount={discount}
                shipping={shippingCost}
                grandTotal={grandTotal}
              />

              {/* Checkout Button */}
              <View style={styles.checkoutButtonContainer}>
                <Button
                  text="Proceed to Checkout"
                  onPress={handleProceedToCheckout}
                  spaceInner={60}
                />
              </View>
            </>
          )}
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
    width: SIZES.xxl + SIZES.base * 2,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  cartListContainer: {
    marginTop: SIZES.padding,
  },
  shippingSection: {
    marginTop: SIZES.padding,
  },
  dropdownContainer: {
    marginBottom: SIZES.margin,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
    marginTop: SIZES.padding * 3,
  },
  emptyCartText: {
    fontSize: SIZES.large,
    fontFamily: 'PoppinsMedium',
    marginTop: SIZES.padding,
    marginBottom: SIZES.base,
  },
  continueShoppingText: {
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsBold',
    textDecorationLine: 'underline',
  },
  checkoutButtonContainer: {
    marginTop: SIZES.padding * 2,
    alignItems: 'center',
  },
});

export default CartScreen;