import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import { useNavigation, useRouter } from 'expo-router'; // For navigation like goBack()
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, SIZES } from '@/constants/ThemeColors'; // Adjust path if necessary

// Sample data for pesticide products
const pesticidesData = [
  {
    id: '1',
    name: 'Paradox',
    description: 'For ABC type of Pest',
    price: '₦5,000',
    image: require('../../assets/images/paradox.png'), // Placeholder, replace with actual image paths
  },
  {
    id: '2',
    name: 'Sur Tee',
    description: 'For Maize Pest Type',
    price: '₦9,000',
    image: require('../../assets/images/sur_tee.png'), // Placeholder
  },
  {
    id: '3',
    name: 'Propulsi',
    description: 'For ABC type of Pest',
    price: '₦8,000',
    image: require('../../assets/images/propulsi.png'), // Placeholder
  },
  {
    id: '4',
    name: 'Ever Green',
    description: 'For Maize Pest Type',
    price: '₦16,000',
    image: require('../../assets/images/ever_green.png'), // Placeholder
  },
  {
    id: '5',
    name: 'Fusion',
    description: 'For ABC type of Pest',
    price: '₦8,000',
    image: require('../../assets/images/fusion.png'), // Placeholder
  },
  {
    id: '6',
    name: 'Convax Plus',
    description: 'For Maize Pest Type',
    price: '₦16,000',
    image: require('../../assets/images/convax_plus.png'), // Placeholder
  },
];

const PesticidesScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  // Function to render each item in the grid
  const renderPesticideItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`pesticides/details?productId=${item.id}`)}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row',  alignItems: 'center',}}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.black} />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Pesticides</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Cart Pressed')} style={styles.headerIcon}>
          <Ionicons name="cart-outline" size={28} color={COLORS.black} />
          {/* You would typically add a badge here for cart count */}
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={pesticidesData}
        renderItem={renderPesticideItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Two columns as per the image
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PesticidesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Overall white background
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
  gridContainer: {
    paddingHorizontal: SIZES.padding / 2, 
    paddingVertical: SIZES.base,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: SIZES.padding, 
  },
  card: {
    flex: 1, // Allows cards to take up equal space
    backgroundColor: COLORS.lightGray, 
    borderRadius: 20, 
    marginHorizontal: SIZES.padding / 2, 
    padding: SIZES.base * 2, 
    alignItems: 'center',
    shadowColor: COLORS.black, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, 
  },
  imageContainer: {
    width: '100%',
    height: 120, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  productImage: {
    width: '80%', 
    height: '80%', 
  },
  productName: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SIZES.base / 2,
    fontFamily: 'PoppinsBold', 
  },
  productDescription: {
    fontSize: 10,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.base,
    fontFamily: 'PoppinsMedium', 
  },
  productPrice: {
    fontSize: SIZES.medium,
    color: COLORS.farmInventoryGreen, 
    fontFamily: 'PoppinsBold', 
  },
});