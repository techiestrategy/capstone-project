// components/StatCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StatCard = ({ title, value, percentage, isIncrease, period }) => {
  const percentageColor = isIncrease ? COLORS.green : COLORS.orange;
  const percentageBg = isIncrease ? COLORS.lightGreen : COLORS.lightOrange;
  const arrowIcon = isIncrease ? 'arrow-up' : 'arrow-down';

  return (
    <View style={[styles.card, { backgroundColor: COLORS.cardBackground }]}>
      <Text style={[styles.title, { color: COLORS.darkGray }]}>{title}</Text>
      <Text style={[styles.period, { color: COLORS.gray }]}>{period}</Text>
      <Text style={[styles.value, { color: COLORS.black }]}>{value}</Text>
      <View style={[
        styles.percentageContainer,
        { borderColor: percentageColor, backgroundColor: percentageBg }
      ]}>
        <Ionicons name={arrowIcon} size={SIZES.large} color={percentageColor} />
        <Text style={[styles.percentageText, { color: percentageColor }]}>
          {' '}{percentage}%
        </Text>
      </View>
      <Text style={[styles.vsLastPeriod, { color: COLORS.gray }]}>vs Last {period}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    flex: 1, // Allow it to take up available space in a row
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsMedium',
    fontWeight: '600',
  },
  period: {
    fontSize: SIZES.font,
    fontFamily: 'PoppinsRegular',
    marginTop: SIZES.base / 2,
    marginBottom: SIZES.base,
  },
  value: {
    fontSize: SIZES.xxxl,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold',
    marginBottom: SIZES.base,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start', // Important to keep it to the left
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
  },
  percentageText: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
  vsLastPeriod: {
    fontSize: SIZES.small,
    fontFamily: 'PoppinsRegular',
    marginTop: SIZES.base,
  },
});

export default StatCard;