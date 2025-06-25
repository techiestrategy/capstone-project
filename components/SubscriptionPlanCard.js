// components/SubscriptionPlanCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SubscriptionPlanCard = ({
  plan, // { id, name, price, features }
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isSelected ? COLORS.primary : COLORS.white }, // primary (green) when selected, white otherwise
        isSelected ? styles.selectedCard : styles.unselectedCard,
      ]}
      onPress={() => onSelect(plan.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.planNameContainer}>
          <Ionicons
            name={isSelected ? 'checkbox-outline' : 'square-outline'} // Checkbox icon
            size={SIZES.large}
            color={isSelected ? COLORS.white : COLORS.black} // White for selected, black for unselected
          />
          <Text style={[styles.planName, { color: isSelected ? COLORS.white : COLORS.black }]}>
            {plan.name}
          </Text>
        </View>
        <View style={[
            styles.priceTag,
            { backgroundColor: isSelected ? COLORS.farmInventoryOrange : COLORS.lightGreen }, // Orange when selected, lightGreen when unselected
        ]}>
          <Text style={[styles.priceText, { color: isSelected ? COLORS.white : COLORS.primary }]}>
            ₦{plan.price.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={SIZES.font} color={isSelected ? COLORS.white : COLORS.farmInventoryGreen} />
            <Text style={[styles.featureText, { color: isSelected ? COLORS.white : COLORS.darkGray }]}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedCard: {
    borderColor: COLORS.primary, // Green border for selected
  },
  unselectedCard: {
    borderColor: COLORS.lightGray, // Light gray border for unselected
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  planNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allow plan name to take space
  },
  planName: {
    fontSize: SIZES.xxl, // Using xxl for plan name
    fontWeight: 'bold',
    marginLeft: SIZES.base / 2,
    fontFamily: 'PoppinsBold',
  },
  priceTag: {
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base * 1.5,
    borderRadius: SIZES.radius,
  },
  priceText: {
    fontSize: SIZES.large, // Using large for price
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
  featuresContainer: {
    marginTop: SIZES.base,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base / 2,
  },
  featureText: {
    fontSize: SIZES.medium, // Using medium for features
    marginLeft: SIZES.base,
    fontFamily: 'PoppinsRegular',
  },
});

export default SubscriptionPlanCard;