import { COLORS, SIZES } from '@/constants/ThemeColors';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const AlertCard = ({ title, date }) => {
  return (
  <View style={styles.alertCard}>
    <View style={{flex: 1, marginRight: 10}}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertDate}>{date}</Text>
    </View>
    <TouchableOpacity style={styles.markDoneButton}>
      <Text style={styles.markDoneText}>Mark as Done</Text>
    </TouchableOpacity>
  </View>
  )
};

export default AlertCard;

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
  alertTitle: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    fontWeight: '600',
    lineHeight: 22,
        fontFamily: 'PoppinsMedium'
  },
  alertDate: {
    fontSize: SIZES.font,
    color: COLORS.green,
    marginTop: 5,
        fontFamily: 'PoppinsBold'
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
    fontSize: SIZES.font,
        fontFamily: 'PoppinsMedium'
  },
});
