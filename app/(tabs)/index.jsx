import AlertCard from '@/components/AlertCard';
import EarningsCard from '@/components/EarningsCard';
import FarmCard from '@/components/FarmCard';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.85; // For FarmCard

// Mock data for the farms list
const farmData = [
  {
    id: '1',
    location: 'Zara Village',
    fieldName: 'Orange Field',
    harvestDate: 'Jan 1, 2025',
    yieldValue: '90KG/HA',
    imageUri: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '2',
    location: 'Odoguyan Village',
    fieldName: 'Maize Field',
    harvestDate: 'Mar 1, 2025',
    yieldValue: '100KG/HA',
    imageUri: 'https://images.unsplash.com/photo-1654066127697-01165de1d877?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: '3',
    location: 'Oniyale Ota',
    fieldName: 'Cassava Field',
    harvestDate: 'May 1, 2025',
    yieldValue: '100KG/HA',
    imageUri: 'https://images.unsplash.com/photo-1710425417427-fee66167fa35?q=80&w=1974&auto=format&fit=crop',
  },
];

// Mock data for earnings
const earningsData = [
  { id: 'e1', crop: 'Maize', amount: '50.0M', percentage: '36.50', isIncrease: true },
  { id: 'e2', crop: 'Cassava', amount: '150.0M', percentage: '36.50', isIncrease: false },
  { id: 'e3', crop: 'Rice', amount: '75.0M', percentage: '12.80', isIncrease: true },
  { id: 'e4', crop: 'Wheat', amount: '25.0M', percentage: '5.20', isIncrease: false },
];

// --- Reusable UI Components ---

// Helper component for FlatList separators
const ListSeparator = ({ width = SIZES.padding }) => <View style={{ width: width }} />;





  



// --- Main Screen Component ---

const DashboardScreen = () => {
  const router = useRouter();

  const Header = () => (
  

  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/farmventory-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.notificationButton} onPress={handleNotification}>
        <Ionicons name="notifications" size={24} color={COLORS.darkGray} />
      </TouchableOpacity>

      <TouchableOpacity style={{}} onPress={handleProfile}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
        style={styles.profileImage}
      />
      </TouchableOpacity>
    </View>
  </View>
);

  const handleNotification = () => {
    // Navigate to forgot password screen
    router.push('notification/NotificationsScreen')
    console.log('Navigating to Notifications');
  };

    const handleProfile = () => {
    // Navigate to forgot password screen
    router.push('settings/UsersScreen')
    console.log('Navigating to Notifications');
  };

  const renderEarningsItem = ({ item }) => (
    <View style={styles.earningsCardWrapper}>
      <EarningsCard
        crop={item.crop}
        amount={item.amount}
        percentage={item.percentage}
        isIncrease={item.isIncrease}
      />
    </View>
  );

  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Header />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>

          {/* Earnings Section - Now a FlatList */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earnings Overview</Text>
            <FlatList
              data={earningsData}
              renderItem={renderEarningsItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.earningsListContentContainer}
              // Use the ListSeparator component for consistent spacing
              ItemSeparatorComponent={() => <ListSeparator width={15} />}
            />
          </View>

          {/* My Farm Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Farm</Text>
              <TouchableOpacity onPress={() => router.push('/myfarm/listFarm')}>
                <Text style={styles.viewAllText}>VIEW ALL FARM</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={farmData}
              renderItem={({ item }) => (
                 <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: 'myfarm/farm-detail/[farmId]', params: { farmId: item.id } })}>
                <View style={{ width: itemWidth }}>
                  <FarmCard item={item} />
                </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContentContainer}
              ItemSeparatorComponent={() => <ListSeparator width={16} />} // Use the new component
            />
          </View>

          {/* Active Alerts Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Alerts</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/alerts')}>
                <Text style={styles.viewAllText}>VIEW ALL ALERTS</Text>
              </TouchableOpacity>
            </View>
            <AlertCard title="Feed the Fish with the new feeds" date="June 5, 2025" />
            <AlertCard title="Begin Pruning of Plantain by October" date="October 1, 2025" />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
    paddingVertical: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    // No specific styles needed here if directly using Image
  },
  logo: {
    width: 150,
    height: 50,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    backgroundColor: COLORS.lightGray,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 22,
    marginLeft: 15,
  },
  earningsListContentContainer: {
    // No horizontal padding here. The overall screen padding is handled by scrollViewContent.
    // ItemSeparatorComponent handles spacing between items.
    // If you need padding at the start/end of the FlatList specifically, add it here.
    paddingRight: 0, // Ensure no extra padding from contentContainer if not needed
  },
  earningsCardWrapper: {
    width: screenWidth * 0.45, // **CRUCIAL: Explicit width for each card**
    // No marginRight here, it's handled by ItemSeparatorComponent
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  viewAllText: {
    fontSize: SIZES.font,
    color: COLORS.gray,
    fontWeight: '500',
  },
  listContentContainer: {
    paddingRight: SIZES.padding * 2, // Padding to the right for the FarmCard FlatList
  },
  farmCard: {
    width: 280,
    height: 160,
    marginRight: 15,
    justifyContent: 'flex-end',
    borderRadius: 20,
    overflow: 'hidden',
  },
  farmCardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
  },
  farmLocation: {
    color: COLORS.white,
    fontSize: SIZES.font,
  },
  farmName: {
    color: COLORS.white,
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  farmDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  farmInfoText: {
    color: COLORS.white,
    fontSize: SIZES.small,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75,
    backgroundColor: COLORS.lightGray,
    paddingBottom: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: SIZES.small,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: COLORS.farmInventoryOrange,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;