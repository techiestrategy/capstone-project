import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Main App component for User Profile
export default function App() {
  // State to hold the URI of the selected profile image
  const [profileImageUri, setProfileImageUri] = useState('https://placehold.co/100x100/A0A0A0/FFFFFF?text=User');

  // Function to handle image picking
const pickImage = async () => {
  console.log('pickImage called');

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  console.log('Permission status:', status);

  if (status !== 'granted') {
    Alert.alert('Permission Required', 'Please grant access to your photo library.');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  console.log('Image picker result:', result);

  if (!result.canceled) {
    setProfileImageUri(result.assets[0].uri);
    console.log('Image URI set:', result.assets[0].uri);
  }
};


  const router = useRouter();

   const editProfile = () => {
    // Navigate to forgot password screen
    router.push('settings/ProfileScreen')
    console.log('Navigating to Edit');
  };

    const backToHome = () => {
    // Navigate to forgot password screen
    router.push('(tabs)')
    console.log('Navigating to Dashboard');
  };

    const handleSettings = () => {
      // Navigate to forgot password screen
      router.push('settings/SettingsScreen')
      console.log('Navigating to Settings');
    };

    const sendSMS = () => {
      // Navigate to forgot password screen
      router.push('settings/SendBulkSms')
      console.log('Navigating to Bulk SMS');
    };

    const handleSubscription = () => {
      // Navigate to forgot password screen
      router.push('settings/SubscriptionScreen')
      console.log('Navigating to Subscription');
    };
  

  return (
    
    <View style={styles.outerContainer}> 
      
      <View style={styles.header}>
        <TouchableOpacity onPress={backToHome}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Profile</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}> 
       
        <TouchableOpacity style={styles.profileSection} onPress={pickImage}>
          <Image
            source={{ uri: profileImageUri }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>

          
          <TouchableOpacity style={styles.profileSection} onPress={editProfile}>
          <Text style={styles.editButtonText}>Edit</Text>
       </TouchableOpacity>

       
        <View style={styles.card}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>Garuba Ali</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Role</Text>
            <Text style={styles.detailValue}>Farmer</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location</Text>
            <Text style={styles.detailValue}>Kaduna, Nigeria</Text>
          </View>
        </View>

        
        <View style={styles.dataCardsContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.dataCardTitle}>My Farms</Text>
            <Text style={styles.dataCardValue}>3</Text>
            <Text style={styles.dataCardSubText}>active farms</Text>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.dataCardTitle}>Harvest Logged</Text>
            <Text style={styles.dataCardValue}>4.3 tons</Text>
            <Text style={styles.dataCardSubText}>Total </Text>
          </View>
        </View>

        
        <View style={styles.dataCardsContainer}>
          <View style={styles.dataCard}>
            <Text style={styles.dataCardTitle}>Joined Since</Text>
            <Text style={styles.dataCardValue}>February</Text>
            <Text style={styles.dataCardSubText}>2024</Text>
          </View>
          <View style={styles.dataCard}>
            <Text style={styles.dataCardTitle}>Last Login</Text>
            <Text style={styles.dataCardValue}>June 6, 2025</Text>
            <Text style={styles.dataCardSubText}>10:42am</Text>
          </View>
        </View>

       
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton}  onPress={handleSettings}>
            <AntDesign name="setting" size={30} color="#28a745" />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={sendSMS}>
            <FontAwesome5 name="sms" size={30} color="#28a745" />
            <Text style={styles.actionButtonText}>Send Bulk SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSubscription}>
            <AntDesign name="edit" size={30} color="#28a745" />
            <Text style={styles.actionButtonText}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Log out pressed')}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, // Adjust for status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15, // Apply padding here for alignment
    backgroundColor: '#f0f0f0', // Match overall background or set a specific header background
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  scrollViewContent: {
    flex: 1, // Ensure ScrollView takes up remaining vertical space
    paddingHorizontal: 15, // Apply horizontal padding to the scrollable content
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#ccc', // Placeholder background
  },
  editButtonText: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    paddingVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
    width: '30%', // Adjust width for alignment
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    width: '65%', // Adjust width for alignment
    textAlign: 'right',
  },
  dataCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dataCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dataCardTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  dataCardValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 5,
  },
  dataCardSubText: {
    fontSize: 14,
    color: '#555',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 10,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
