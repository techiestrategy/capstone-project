import AlertCard from '@/components/AlertCard';
import Button from '@/components/Button';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Mock data for the farms list
const inventoryData = [

];



// Main Screen Component
const MyAlertScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();


      const handleAddNew = () => {
    // Navigate to forgot password screen
    router.push('alert/addAlert')
    console.log('Navigating to Forgot Password');
  };

    
  return (
    <SafeAreaView style={styles.safeArea}>
      
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Alerts List</Text>
        
      </View>

      <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>7 Active Alerts</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>3 Completed alerts</Text>
              </TouchableOpacity>
            </View>
<ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
      {/* Farm List */}
      <View style={styles.section}>
            
            <AlertCard title="Feed the Fish with the new feeds" date="June 5, 2025" />
            <AlertCard title="Begin Pruning of Plantain by October" date="October 1, 2025" />
            <AlertCard title="Feed the Fish with the new feeds" date="June 5, 2025" />
            <AlertCard title="Begin Pruning of Plantain by October" date="October 1, 2025" />
            <AlertCard title="Feed the Fish with the new feeds" date="June 5, 2025" />
            <AlertCard title="Begin Pruning of Plantain by October" date="October 1, 2025" />
          </View>

          <Button text="Add New Alert" onPress={handleAddNew} spaceBottom={30} />
          </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
    scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 40,
  },
  backButton: { 
    backgroundColor: COLORS.farmInventoryOrange,
    width: SIZES.xxl,
    height: SIZES.xxl,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
headerTitle: {
    fontSize: 20,
     fontFamily: 'PoppinsMedium',
    color: COLORS.farmInventoryGreen,
    marginLeft: 0,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 'auto',
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
        paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: SIZES.l,
    color: COLORS.primary,
    fontFamily: 'PoppinsBold'
  },
  addButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Spacing above the button
    marginBottom: 10,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
        fontFamily: 'PoppinsBold'
  },
});

export default MyAlertScreen;