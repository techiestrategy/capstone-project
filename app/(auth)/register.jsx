import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const register = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

const handleSignUp = () => {
    console.log('Sign In pressed!');
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
    console.log('Agreed to Terms:', agreeToTerms);
    // Add your sign-in logic here (e.g., API call)
  };

  const handleGoogleSignUp = () => {
    console.log('Sign Up with Google pressed!');
    // Add your Google sign-in logic here
  };

  const handleSignIn = () => {
    // Navigate to sign-up screen
    router.push('login')
    console.log('Navigating to Sign In');
  };

 


  const router = useRouter();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      
        {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <FontAwesome5 name="arrow-circle-left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New User, Register</Text>
          </View>

          <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/farmventory-logo.png')} // You'll need to add your logo here
            style={styles.logo}
            resizeMode="contain"
          />
        </View>



<ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Enter Email</Text>
          <View style={styles.inputWrapper}>
            
            <FontAwesome5 name="envelope" size={24} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>Enter Phone Number</Text>
          <View style={styles.inputWrapper}>
            
            <FontAwesome5 name="phone-alt" size={24} color="black" style={styles.inputIcon} />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-number"
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            
            <FontAwesome5 name="lock" size={24} color="black" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordVisibilityToggle}
            >
              <FontAwesome5
                name={showPassword ? 'eye' : 'eye-slash'}
                size={20}
                color="#F58634"
              />
              
            </TouchableOpacity>
          </View>

          <View style={styles.termsAndForgot}>
            <View style={styles.checkboxContainer}>
              {/* <Checkbox
                value={agreeToTerms}
                onValueChange={setAgreeToTerms}
                color={agreeToTerms ? '#FFA500' : '#4630EB'} // Example color, adjust as needed
                style={styles.checkbox}
              />

              <FontAwesome5 name="check-square" size={24} color="black" /> */}
              <TouchableOpacity
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              style={styles.checkbox}
            >
              <FontAwesome5
                          
                name={agreeToTerms ? 'check-square' : 'square'}
                size={20}
                color="#fff"
                style={styles.checkbox}
              />
              </TouchableOpacity>

              <Text style={styles.termsText}>I agree to Terms & Conditions</Text>
            </View>
           
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
            <Text style={styles.signInButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.signUpPrompt}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signUpLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.googleSignInContainer}>
          <TouchableOpacity style={styles.googleSignInButton} onPress={handleGoogleSignUp}>
            <Image
              source={require('@/assets/images/google-logo.png')} // You'll need to add Google logo here
              style={styles.googleLogo}
            />
            <Text style={styles.googleSignInButtonText}>Sign Up with Google</Text>
          </TouchableOpacity>
        </View>

        </View>

        



    {/* <View style={styles.Container}>
      <Text>login</Text>
       <Button title="Go to Register" onPress={() => router.push('register')} />
    </View> */}
    </ScrollView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150, 
    height: 50, 
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#00A859',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  scrollContainer: {
    flexGrow: 1, 
    paddingTop: 30, 
    paddingBottom: 40, 
    justifyContent: 'space-between', 
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  passwordVisibilityToggle: {
    padding: 10,
  },
  termsAndForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 3,
    borderRadius: 4,
    backgroundColor: '#00A859',
    width: 20,
    height: 20,
  },
  termsText: {
    color: '#fff',
    fontSize: 11,
  },
  forgotPasswordText: {
    color: '#FFF', 
    fontSize: 11,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#F58634', // Orange color for Sign In button
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 5,
  },
  signUpLink: {
    color: '#fff', // Yellowish color for "Sign up" link
    fontSize: 14,
    fontWeight: 'bold',
  },
  googleSignInContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    marginBottom: 50,
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', // White background for Google button
    borderRadius: 8,
    paddingVertical: 15,
    marginVertical: 40,
    justifyContent: 'center',
    shadowColor: '#000',
    width: '100%',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleSignInButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
})