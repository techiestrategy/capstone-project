// components/CartItemCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartItemCard = ({ item, onQuantityChange, onRemoveItem }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUri }} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={[styles.itemName, { color: COLORS.black }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: COLORS.farmInventoryGreen }]}>₦{item.price.toLocaleString()}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity + 1)} style={[styles.quantityButton, { backgroundColor: COLORS.black }]}>
          <Ionicons name="add" size={SIZES.large} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={[styles.itemQuantity, { color: COLORS.black }]}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onQuantityChange(item.id, item.quantity - 1)} style={[styles.quantityButton, { backgroundColor: COLORS.black }]}>
          <Ionicons name="remove" size={SIZES.large} color={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={[styles.deleteButton, { backgroundColor: COLORS.lightGray }]}>
          <Ionicons name="trash" size={SIZES.large} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    marginBottom: SIZES.base,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  itemImage: {
    width: SIZES.width * 0.15,
    height: SIZES.width * 0.15,
    marginRight: SIZES.base,
    borderRadius: SIZES.radius / 2,
  },
  detailsContainer: {
    flex: 1,
    marginRight: SIZES.base,

  },
  itemName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
  itemPrice: {
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsRegular',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: SIZES.large * 1.8,
    height: SIZES.large * 1.8,
    borderRadius: (SIZES.large * 1.8) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.base / 2,
    backgroundColor: 'red',
  },
  itemQuantity: {
    fontSize: SIZES.large,
    marginHorizontal: SIZES.base / 2,
    fontFamily: 'PoppinsMedium',
  },
  deleteButton: {
    width: SIZES.large * 1.8,
    height: SIZES.large * 1.8,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base,
  },
});

export default CartItemCard;