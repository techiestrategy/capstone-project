// components/FarmDetailCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FarmDetailCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.8}>
      <ImageBackground
        source={{ uri: item.imageUri }}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.topRow}>
            <Text style={[styles.locationText, { color: COLORS.white }]}>{item.location}</Text>
            <Ionicons name="arrow-forward" size={SIZES.large} color={COLORS.white} />
          </View>
          <View style={styles.bottomRow}>
            <View>
              <Text style={[styles.fieldNameText, { color: COLORS.white }]}>{item.fieldName}</Text>
              <Text style={[styles.harvestDateText, { color: COLORS.white }]}>
                Harvest on {item.harvestDate}
              </Text>
            </View>
            <Text style={[styles.yieldText, { color: COLORS.white }]}>
              {item.yieldValue}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius * 2, // More rounded corners for this card
    overflow: 'hidden',
    height: SIZES.height * 0.25, // Fixed height for consistency, adjust as needed
    width: '100%', // Take full width
    marginBottom: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end', // Align content to the bottom
  },
  imageStyle: {
    borderRadius: SIZES.radius * 2,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark overlay for text readability
    padding: SIZES.padding,
    justifyContent: 'space-between',
    flex: 1, // Fill available space
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding * 0.5, // Space between top and bottom text
  },
  locationText: {
    fontSize: SIZES.font,
    fontFamily: 'PoppinsRegular',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  fieldNameText: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
    fontFamily: 'PoppinsBold',
  },
  harvestDateText: {
    fontSize: SIZES.font,
    fontFamily: 'PoppinsRegular',
    marginTop: SIZES.base / 2,
  },
  yieldText: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
});

export default FarmDetailCard;