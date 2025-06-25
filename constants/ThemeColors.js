
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#34A853',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  gray: '#8A8A8A',
  darkGray: '#333333',
  green: '#34A853',
  lightGreen: 'rgba(52, 168, 83, 0.1)',
  orange: '#F39C12',
  lightOrange: 'rgba(243, 156, 18, 0.1)',
  mintGreen: '#ABE670',
  // Your specific colors from the image
  farmInventoryGreen: '#00A859', // This was your main green
  farmInventoryOrange: '#F58634', // This was your main orange button
  background: '#FFFFFF',
  formContainer: '#E6F4ED',
 
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  small: width * 0.03,
  medium: width * 0.04,
  large: width * 0.05,
  xxl: width * 0.06,
  xxxl: width * 0.07,
  h1: width * 0.07,

  padding: 20,
  margin: 15,
  radius: 8, 
  topRadius: 30,

  width,
  height,
};

// export const SIZES = {
//   base: 8,
//   small: 12,
//   font: 14,
//   medium: 16,
//   large: 18,
//   xl: 20,
//   xxl: 24,
//   h1: 25,

//   padding: 20,
//   margin: 15,
//   radius: 8, 
//   topRadius: 30, 
// };


// You can also export a default object if you prefer to import all as one
// const theme = { COLORS, SIZES };
// export default theme;