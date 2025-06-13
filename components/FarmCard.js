import { COLORS } from '@/constants/ThemeColors';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FarmCard = ({ item }) => {
  return (
  <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
    <ImageBackground
      source={{ uri: item.imageUri }}
      style={styles.cardBackground}
      imageStyle={{ borderRadius: 20 }}
    >
      <View style={styles.cardOverlay}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLocation}>{item.location}</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardFieldName}>{item.fieldName}</Text>
            <Text style={styles.cardHarvestDate}>Harvest on {item.harvestDate}</Text>
          </View>
          <Text style={styles.cardYield}>{item.yieldValue}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
  )
};

export default FarmCard;

const styles = StyleSheet.create({

  cardContainer: {
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.white, // Important for shadow to show on iOS
  },
  cardBackground: {
    flex: 1,
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLocation: {
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  arrowButton: {
    backgroundColor: COLORS.farmInventoryGreen,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardFieldName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  cardHarvestDate: {
    fontSize: 14,
    color: COLORS.mintGreen,
    opacity: 0.9,
    fontFamily: 'PoppinsBold',
  },
  cardYield: {
    fontSize: 14,
    color: COLORS.farmInventoryOrange,
    fontWeight: '600',
    fontFamily: 'PoppinsBold',
  },
  
});
