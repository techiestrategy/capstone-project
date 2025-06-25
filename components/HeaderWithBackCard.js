import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderTitleCard = ({ title, spaceTop = 0 }) => {
   const navigation = useNavigation();
  return (
  <View style={[styles.header, { marginTop: spaceTop }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={16} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
  )
};

export default HeaderTitleCard;

const styles = StyleSheet.create({

    header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.medium,
  },
  backButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    width: 20,
    height: 20,
    borderRadius: SIZES.xxl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.black,
    marginLeft: 10,
    fontFamily: 'PoppinsMedium'
  },
});
