// app/pesticides/detail.jsx (Your Pesticide Detail Screen)

import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'; // Correct imports
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
  const { productId } = useLocalSearchParams();

  const product = {
    id: productId ,
    name: 'Paradox',
    image: require('@/assets/images/paradox_detail.png'), // Adjusted path based on typical structure
    // If your assets folder is directly at the project root,
    // and this file is app/pesticides/detail.jsx, then '../../assets'
    // would correctly point to the root 'assets' directory.
    targetPest: 'Weedicidies / Herbicide',
    activeIngredient: 'Halosulfuron Methyl 75%, Topramezone 3%, Terbutylazine 37%',
    applicationMethod: 'Halosulfuron Methyl 75%, Topramezone 3%, Terbutylazine 37%',
    safetyNotes: 'Lorem ipsum, placeholder or dummy text used in typesetting and graphic design for previewing layouts. It is used to present design and layout concepts, for example, before the final text is available for publishing.',
  };

  const [quantity, setQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
  };

  const router = useRouter();

   const cartLoad = () => {
    // Navigate to forgot password screen
    router.push('pesticides/CartScreen')
    console.log('Navigating to Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={cartLoad} style={styles.headerIcon}>
          <Ionicons name="cart-outline" size={28} color={COLORS.black} />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Product Details Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.productImageWrapper}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

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
    backgroundColor: COLORS.lightGreyBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  headerIcon: {
    padding: SIZES.base,
    position: 'relative',
  },
  headerTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.black,
    fontFamily: 'PoppinsBold',
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
    height: 250,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: '80%',
    height: '100%',
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
    overflow: 'hidden',
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
    minWidth: 40,
    alignItems: 'center',
  },
  quantityDisplayText: {
    fontSize: SIZES.large,
    color: COLORS.black,
    fontFamily: 'PoppinsMedium',
  },
  addToCartButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  addToCartButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
  infoSection: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.cardRadius,
    marginHorizontal: SIZES.padding,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
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
    fontFamily: 'PoppinsBold',
  },
  infoDescription: {
    fontSize: SIZES.font,
    color: COLORS.darkGray,
    lineHeight: SIZES.large,
    fontFamily: 'PoppinsMedium',
  },
});