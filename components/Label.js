import { COLORS, SIZES } from '@/constants/ThemeColors';
import { StyleSheet, Text } from 'react-native';

const Label = ({ children, style }) => {
  return <Text style={[styles.label, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: SIZES.base,
    fontFamily: 'PoppinsBold',
  },
});

export default Label;