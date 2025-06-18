import Button from '@/components/Button';
import InventoryCard from '@/components/InventoryCard';
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
const inventoryData = [
  {
    id: '1',
    title: 'Pesticides',
    location: 'Zara Village',
    unitLeft: 1,

  },
  {
    id: '2',
    title: 'Fertilizer',
    location: 'Odogunyan Village',
    unitLeft: 2,
  },
  {
    id: '3',
    title: 'Fish Feeds',
    location: 'Oniyale Village',
    unitLeft: 6,
  },
  {
    id: '4',
    title: 'Pesticides',
    location: 'Zara Village',
    unitLeft: 1,
  },
  {
    id: '5',
    title: 'Pesticides',
    location: 'Zara Village',
    unitLeft: 1,
  },
];



// Main Screen Component
const MyInventoryScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();


      const handleAddNew = () => {
    // Navigate to forgot password screen
    router.push('inventory/addNew')
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
        <Text style={styles.headerTitle}>Inventory</Text>
        
      </View>

      {/* Farm List */}
      <FlatList
        data={inventoryData}
        renderItem={({ item }) => <InventoryCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
            
            <Button text="Add New Item" onPress={handleAddNew} spaceBottom={20} />
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

export default MyInventoryScreen;