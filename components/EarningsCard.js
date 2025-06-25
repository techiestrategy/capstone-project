import { COLORS, SIZES } from '@/constants/ThemeColors';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EarningsCard = ({ crop, amount, percentage, isIncrease }) => {

//   const { width } = useWindowDimensions();
//   const buttonWidth = width * 0.9;

  return (
    <View style={styles.earningsCard}>
    <Text style={styles.cardTitle}>Total Earnings</Text>
    <Text style={styles.cardTitle}>from {crop}</Text>
    <Text style={[styles.cardSubtitle, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
      This Month
    </Text>
    <Text style={[styles.earningsAmount, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
      ₦{amount}
    </Text>
    <View style={[
      styles.percentageContainer,
      { 
        borderColor: isIncrease ? COLORS.green : COLORS.orange,
        backgroundColor: isIncrease ? COLORS.lightGreen : COLORS.lightOrange,
      }
    ]}>
      <MaterialCommunityIcons
        name={isIncrease ? 'arrow-up' : 'arrow-down'}
        size={16}
        color={isIncrease ? COLORS.green : COLORS.orange}
      />
      <Text style={[styles.percentageText, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
        {' '}{percentage}%
      </Text>
    </View>
    <Text style={styles.vsLastMonthText}>vs Last Month</Text>
  </View>
  );
};

export default EarningsCard;

const styles = StyleSheet.create({

  earningsCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 15,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    fontFamily: 'PoppinsMedium',
    lineHeight: 19,
  },
  cardSubtitle: {
    fontSize: SIZES.font,
    marginTop: 4,
  },
  earningsAmount: {
    fontSize: SIZES.xxxl,
    marginVertical: 10,
       fontFamily: 'PoppinsBold'
  },
    percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  percentageText: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
  vsLastMonthText: {
    marginTop: 8,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
});
