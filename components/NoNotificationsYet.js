// components/NoNotificationsYet.js
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { Image, StyleSheet, Text, View } from 'react-native';

const NoNotificationsYet = ({ onGoBack }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/120x120/F58634/FFFFFF?text=Mailbox' }} // Updated color to farmInventoryOrange
        style={styles.mailboxIcon}
        resizeMode="contain"
      />
      <Text style={styles.title}>No notifications yet</Text>
      <Text style={styles.message}>
        Your notification will appear here once you've received them.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.white,
  },
  mailboxIcon: {
    width: SIZES.width * 0.3, // Example: 30% of screen width
    height: SIZES.width * 0.3, // Keep aspect ratio
    marginBottom: SIZES.padding * 2,
  },
  title: {
    fontSize: SIZES.xxl, // Using SIZES.xxl
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.base,
    textAlign: 'center',
  },
  message: {
    fontSize: SIZES.large, // Using SIZES.large
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: SIZES.large * 1.5, // Dynamic line height
  },
});

export default NoNotificationsYet;