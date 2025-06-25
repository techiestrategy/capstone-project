// components/OrderSummaryCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { StyleSheet, Text, View } from 'react-native';

const OrderSummaryCard = ({ subtotal, discount, shipping, grandTotal }) => {
  const renderSummaryRow = (label, value, isGrandTotal = false) => (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, { color: isGrandTotal ? COLORS.white : COLORS.white }]}>{label}</Text>
      <Text style={[styles.summaryValue, { color: isGrandTotal ? COLORS.white : COLORS.white }]}>₦{value.toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: COLORS.farmInventoryGreen }]}>
      <Text style={[styles.title, { color: COLORS.white }]}>Order Summary</Text>
      {renderSummaryRow('Subtotal', subtotal)}
      {renderSummaryRow('Discount', discount)}
      {renderSummaryRow('Shipping', shipping)}
      <View style={styles.divider} />
      {renderSummaryRow('Grand Total', grandTotal, true)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.padding * 1.5,
  },
  title: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
    fontFamily: 'PoppinsBold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  summaryLabel: {
    fontSize: SIZES.large,
    fontFamily: 'PoppinsRegular',
  },
  summaryValue: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    marginVertical: SIZES.base,
  },
});

export default OrderSummaryCard;