import AlertCard from '@/components/AlertCard';
import EarningsCard from '@/components/EarningsCard';
import FarmCard from '@/components/FarmCard';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { useRouter } from 'expo-router';
import React from 'react';
import {
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

import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.85;

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

// --- Reusable UI Components ---

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/farmventory-logo.png')} // You'll need to add your logo here
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.notificationButton}>
        <Ionicons name="notifications" size={24} color={COLORS.darkGray} />
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }}
        style={styles.profileImage}
      />
    </View>
  </View>
);



// --- Main Screen Component ---

const DashboardScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Header />

          {/* Earnings Section */}
          <View style={styles.earningsSection}>
            <EarningsCard crop="Maize" amount="50.0M" percentage="36.50" isIncrease={true} />
            <EarningsCard crop="Cassava" amount="150.0M" percentage="36.50" isIncrease={false} />
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
              horizontal showsHorizontalScrollIndicator={false}
              data={farmData}
              renderItem={({ item }) => (
                <View style={{ width: itemWidth }}>
                  <FarmCard item={item} />
                </View>
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContentContainer}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}

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
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginRight: 10,
  },
  logoText: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.darkGray,
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
  earningsSection: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,

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
    paddingBottom: 5, // For better spacing with labels
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
    marginTop: 10, // Spacing above the button
    marginBottom: 40,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;