import Button from '@/components/Button';
import HarvestCard from '@/components/HarvestCard';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
// Mock data for the farms list
const harvestData = [
  {
    id: '1',
    harvestTitle: 'Maize Pruned',
    location: 'Zara Village',
    harvestDate: 'January 1, 2025',
    status: 'Completed',
    yieldValue: '90.0KG / HA',

  },
  {
    id: '2',
    harvestTitle: 'Cassava Pruned',
    location: 'Odogunyan Village',
    harvestDate: 'January 1, 2025',
    status: 'In Progress',
    yieldValue: '90.0KG / HA',
  },
  {
    id: '3',
    harvestTitle: 'Watermelon Pruned',
    location: 'Oniyale Ota',
    harvestDate: 'January 1, 2025',
    status: 'In Progress',
    yieldValue: '90.0KG / HA',
  },
  {
    id: '4',
    harvestTitle: 'Orange Pruned',
    location: 'Oniyale Ota',
    harvestDate: 'January 1, 2025',
    status: 'In Progress',
    yieldValue: '90.0KG / HA',
  },
  {
    id: '5',
    harvestTitle: 'Vegetable Pruned',
    location: 'Oniyale Ota',
    harvestDate: 'January 1, 2025',
    status: 'In Progress',
    yieldValue: '90.0KG / HA',
  },
];



// Main Screen Component
const MyHarvestScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();


      const handleLogHarvest = () => {
    // Navigate to forgot password screen
    router.push('harvest/logHarvest')
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
        <Text style={styles.headerTitle}>Harvest History</Text>
        
      </View>

      {/* Farm List */}
      <FlatList
        data={harvestData}
        renderItem={({ item }) => <HarvestCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
            
            <Button text="Log New Harvest" onPress={handleLogHarvest} spaceBottom={20} />
        }
      />
    </SafeAreaView>
  );
};

// --- Styles ---


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: 28,
     fontFamily: 'PoppinsBold',
    color: COLORS.black,
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
  addButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10, // Spacing above the button
    marginBottom: 40,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyHarvestScreen;