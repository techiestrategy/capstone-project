import Button from '@/components/Button';
import FarmCard from '@/components/FarmCard';
import { COLORS } from '@/constants/ThemeColors';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Mock data for the farms list
const farmData = [
  {
    id: '1',
    location: 'Zara Village',
    fieldName: 'Orange Field',
    harvestDate: 'January 1, 2025',
    yieldValue: '90.0KG / HA',
    imageUri: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '2',
    location: 'Odoguyan Village',
    fieldName: 'Maize Field',
    harvestDate: 'March 1, 2025',
    yieldValue: '100.0KG / HA',
    imageUri: 'https://images.unsplash.com/photo-1654066127697-01165de1d877?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    location: 'Oniyale Ota',
    fieldName: 'Cassava Field',
    harvestDate: 'May 1, 2025',
    yieldValue: '100.0KG / HA',
    imageUri: 'https://images.unsplash.com/photo-1710425417427-fee66167fa35?q=80&w=1974&auto=format&fit=crop',
  },
];

const handleAddFarm = () => {
    // Navigate to forgot password screen
    router.push('farmsetup/addNewFarm')
    console.log('Navigating to Farm Setup');
  };


  const router = useRouter();
// Main Screen Component
const MyFarmScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Farm</Text>
        <Text style={styles.headerSubtitle}>7 Total Farms</Text>
      </View>

      {/* Farm List */}
      <FlatList
        data={farmData}
        renderItem={({ item }) => <FarmCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
            <Button text="Add New Farm" onPress={handleAddFarm} spaceBottom={20}  />
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
    marginBottom: 30,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.black,
    marginLeft: 15,
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

});

export default MyFarmScreen;