import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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

// Reusable Farm Card Component
const FarmCard = ({ item }) => (
  <TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
    <ImageBackground
      source={{ uri: item.imageUri }}
      style={styles.cardBackground}
      imageStyle={{ borderRadius: 20 }}
    >
      <View style={styles.cardOverlay}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLocation}>{item.location}</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardFieldName}>{item.fieldName}</Text>
            <Text style={styles.cardHarvestDate}>Harvest on {item.harvestDate}</Text>
          </View>
          <Text style={styles.cardYield}>{item.yieldValue}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

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
            <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                <Text style={styles.addButtonText}>Add New Farm</Text>
            </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
};

// --- Styles ---

const COLORS = {
  primary: '#F39C12', // Orange
  secondary: '#2ECC71', // Green
  white: '#FFFFFF',
  black: '#1C1C1E',
  gray: '#8A8A8E',
  background: '#FFFFFF',
};

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
    backgroundColor: COLORS.primary,
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
  cardContainer: {
    height: 220,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.white, // Important for shadow to show on iOS
  },
  cardBackground: {
    flex: 1,
  },
  cardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardLocation: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '500',
  },
  arrowButton: {
    backgroundColor: COLORS.secondary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardFieldName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  cardHarvestDate: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  cardYield: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: COLORS.primary,
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

export default MyFarmScreen;