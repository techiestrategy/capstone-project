// components/NotificationCard.js
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NotificationCard = ({ title, description, date, isRead = false }) => {
  return (
    <View style={[styles.card, isRead ? styles.readCard : styles.unreadCard]}>
      <View style={[styles.iconContainer, isRead ? styles.readIconBg : styles.unreadIconBg]}>
        <Ionicons
          name={isRead ? 'mail-open' : 'mail'}
          size={SIZES.large} // Changed from SIZES.xl to SIZES.large based on new SIZES definition
          color={isRead ? COLORS.gray : COLORS.white}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, isRead ? styles.readTitle : styles.unreadTitle]}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius, // Using SIZES.radius (which is 8)
    padding: SIZES.padding - 5, // Using SIZES.padding (which is 20)
    marginBottom: SIZES.base,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  readCard: {
    backgroundColor: COLORS.white,
  },
  unreadCard: {
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    width: SIZES.large * 2, // Dynamic size based on SIZES.large
    height: SIZES.large * 2, // Dynamic size based on SIZES.large
    borderRadius: SIZES.large, // Dynamic radius
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  readIconBg: {
    backgroundColor: COLORS.lightGray,
  },
  unreadIconBg: {
    backgroundColor: COLORS.farmInventoryOrange, // Using COLORS.farmInventoryOrange
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base / 2,
  },
  title: {
    fontSize: SIZES.large, // Using SIZES.large
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: SIZES.base,
  },
  readTitle: {
    color: COLORS.darkGray,
  },
  unreadTitle: {
    color: COLORS.black,
  },
  date: {
    fontSize: SIZES.small, // Using SIZES.small
    color: COLORS.gray,
  },
  description: {
    fontSize: SIZES.font, // Using SIZES.font
    color: COLORS.gray,
  },
});

export default NotificationCard;