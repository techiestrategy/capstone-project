// components/CreditCardInput.js
import LabeledTextInput from '@/components/LabeledTextInput'; // Reusing LabeledTextInput
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const CreditCardInput = () => {
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState(''); // MM/YY
  const [securityCode, setSecurityCode] = useState(''); // CVV

  // Function to format card number with spaces
  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const digitsOnly = text.replace(/\D/g, '');
    // Insert spaces every 4 digits
    let formattedText = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedText += ' ';
      }
      formattedText += digitsOnly[i];
    }
    return formattedText;
  };

  // Function to format expiry date as MM/YY
  const formatExpiryDate = (text) => {
    let formattedText = text.replace(/\D/g, ''); // Remove non-digits
    if (formattedText.length > 2) {
      formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2, 4);
    }
    return formattedText.substring(0, 5); // Max MM/YY length
  };


  return (
    <View style={styles.container}>
      <Text style={[styles.acceptedCardsText, { color: COLORS.darkGray }]}>Accepted cards</Text>
      <View style={styles.cardIconsContainer}>
        {/* Replace with your actual local images or more robust icon library if needed */}
        <Image
          source={{ uri: 'https://placehold.co/50x30/FFFFFF/F39C12?text=VISA' }} // Placeholder VISA
          style={styles.cardIcon}
          resizeMode="contain"
        />
        <Image
          source={{ uri: 'https://placehold.co/50x30/FFFFFF/333333?text=MC' }} // Placeholder Mastercard
          style={styles.cardIcon}
          resizeMode="contain"
        />
        {/* Add more card icons as needed */}
      </View>

      <LabeledTextInput
        label="Name on card"
        placeholder="Enter your name"
        value={nameOnCard}
        onChangeText={setNameOnCard}
        autoCapitalize="words"
      />
      <LabeledTextInput
        label="Card number"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={formatCardNumber(cardNumber)}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        maxLength={19} // 16 digits + 3 spaces
      />

      <View style={styles.expiryCvvRow}>
        <View style={styles.halfInput}>
          <LabeledTextInput
            label="Expiry date"
            placeholder="MM/YY"
            value={formatExpiryDate(expiryDate)}
            onChangeText={setExpiryDate}
            keyboardType="numeric"
            maxLength={5} // MM/YY format
          />
        </View>
        <View style={styles.halfInput}>
          <LabeledTextInput
            label="Security code"
            placeholder="CVV"
            value={securityCode}
            onChangeText={setSecurityCode}
            keyboardType="numeric"
            maxLength={4} // CVV can be 3 or 4 digits
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styling for the entire credit card input section
  },
  acceptedCardsText: {
    fontSize: SIZES.medium,
    fontFamily: 'PoppinsMedium',
    marginBottom: SIZES.base,
  },
  cardIconsContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  cardIcon: {
    width: SIZES.width * 0.12, // Responsive width
    height: SIZES.width * 0.08, // Responsive height
    marginRight: SIZES.base,
  },
  expiryCvvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%', // Roughly half width for two inputs in a row
  },
});

export default CreditCardInput;