import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import { useLocalSearchParams, useNavigation } from 'expo-router'; // useLocalSearchParams for dynamic routes
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '@/constants/ThemeColors'; // Adjust path if necessary

const PesticideDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // This will get params if passed from a list, e.g., /pesticides/detail?productId=1

  // In a real app, you would fetch product details based on productId from an API
  // For now, we'll use a placeholder for "Paradox" details
  const product = {
    id: id || '1', // Use productId from params or default to '1'
    name: 'Paradox', //
    image: require('@/assets/images/paradox_detail.png'), // Placeholder. Make sure this path is correct relative to detail.jsx
    targetPest: 'Weedicidies / Herbicide', //
    activeIngredient: 'Halosulfuron Methyl 75%, Topramezone 3%, Terbutylazine 37%', //
    applicationMethod: 'Halosulfuron Methyl 75%, Topramezone 3%, Terbutylazine 37%', //
    safetyNotes: 'Lorem ipsum, placeholder or dummy text used in typesetting and graphic design for previewing layouts. It is used to present design and layout concepts, for example, before the final text is available for publishing.', //
  };

  const [quantity, setQuantity] = useState(1); // State for quantity selector

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
    // Implement actual add to cart logic here (e.g., update global cart state, API call)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={() => console.log('Cart Pressed')} style={styles.headerIcon}>
          <Ionicons name="cart-outline" size={28} color={COLORS.black} />
          {/* Cart Badge - based on the image */}
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Product Details Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.productImageWrapper}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Quantity Selector and Add to Cart Button */}
        <View style={styles.quantityCartRow}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <View style={styles.quantityDisplay}>
              <Text style={styles.quantityDisplayText}>{quantity}</Text>
            </View>
            <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Product Information Sections */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Target Pest</Text>
          <Text style={styles.infoDescription}>{product.targetPest}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Active Ingredient</Text>
          <Text style={styles.infoDescription}>{product.activeIngredient}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Application Method</Text>
          <Text style={styles.infoDescription}>{product.applicationMethod}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Safety Notes</Text>
          <Text style={styles.infoDescription}>{product.safetyNotes}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PesticideDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreyBackground, // Light grey background for the whole screen
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white, // White header background
  },
  headerIcon: {
    padding: SIZES.base,
    position: 'relative',
  },
  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.black,
    fontFamily: 'PoppinsBold', // Assuming PoppinsBold is loaded
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary, // Green badge color
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: SIZES.padding,
  },
  productImageWrapper: {
    backgroundColor: COLORS.white, // White background for the image section
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
    height: 250, // Fixed height for the image wrapper
    shadowColor: COLORS.black, // Optional: for subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: '80%', // Image width relative to its container
    height: '100%', // Image height relative to its container
  },
  quantityCartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: SIZES.radius,
    overflow: 'hidden', // Ensures buttons don't overflow border radius
  },
  quantityButton: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  quantityDisplay: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    minWidth: 40, // Ensure enough space for the number
    alignItems: 'center',
  },
  quantityDisplayText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: 'PoppinsMedium', // Assuming PoppinsMedium is loaded
  },
  addToCartButton: {
    backgroundColor: COLORS.primary, // Green "Add to Cart" button
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.padding * 1.5, // Increased padding to make it wider
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Make button take remaining space
    marginLeft: SIZES.base * 2, // Space between quantity and button
  },
  addToCartButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium', // Assuming PoppinsMedium is loaded
  },
  infoSection: {
    backgroundColor: COLORS.white, // White background for info sections
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black, // Optional: for subtle shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base,
    fontFamily: 'PoppinsBold', // Assuming PoppinsBold is loaded
  },
  infoDescription: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    lineHeight: SIZES.large,
    fontFamily: 'PoppinsMedium', // Assuming PoppinsMedium is loaded
  },
});