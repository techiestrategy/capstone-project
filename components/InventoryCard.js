import { COLORS, SIZES } from '@/constants/ThemeColors';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const InventoryCard = ({ item }) => {
  const {
    title,
    location,
    unitLeft,
  } = item;

  return (
    <View style={styles.alertCard}>
      <View style={{ flex: 1.10, marginRight: 10 }}>
        <Text style={styles.harvestTitle}>{title}</Text>
        <Text style={styles.status}>
    {`${unitLeft} Unit${unitLeft === 1 ? '' : 's'} left`}
  </Text>
      </View>
      <View style={{ flex: 1.2, marginRight: 0, alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: '-15',  }}>
        
        <Text style={[styles.weight, { textAlign: 'right' }]}>{location}</Text>
      </View>
    </View>
  );
};

export default InventoryCard;

const styles = StyleSheet.create({

  alertCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  harvestLocation: {
    fontFamily: 'PoppinsMedium'
  },
  harvestTitle: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: 'PoppinsBold'
  },
  harvestDate: {
    fontSize: SIZES.font,
    color: COLORS.green,
    marginTop: 5,

  },
  status: {
    fontFamily: 'PoppinsMedium'
  },
  weight: {
    fontFamily: 'PoppinsMedium'
  },
  markDoneButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    borderRadius: 20,
  },
  markDoneText: {
    color: COLORS.orange,
    fontWeight: 'bold',
    fontSize: SIZES.font,
  },
  statusInProgress: {
    color: COLORS.gray,
  },

  statusDone: {
    color: COLORS.green,
  },
});
