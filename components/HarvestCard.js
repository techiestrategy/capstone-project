import { COLORS, SIZES } from '@/constants/ThemeColors';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const HarvestCard = ({ item }) => {
  const {
    harvestTitle,
    location,
    harvestDate,
    status,
    yieldValue,
  } = item;

  return (
    <View style={styles.alertCard}>
      <View style={{ flex: 1.90, marginRight: 10 }}>
        <Text style={styles.harvestTitle}>{harvestTitle}</Text>
        <Text style={styles.harvestLocation}>{location}</Text>
        <Text style={styles.harvestDate}>{harvestDate}</Text>
      </View>
      <View style={{ flex: 1, marginRight: 0, alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '-20' }}>
        <Text style={[
          styles.status,
          status === 'Completed' ? styles.statusDone : styles.statusInProgress
        ]}>{status}</Text>
        <Text style={styles.weight}>{yieldValue}</Text>
      </View>
    </View>
  );
};

export default HarvestCard;

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
    color: COLORS.darkGray,
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
