import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const EarningsCard = ({ crop, amount, percentage, isIncrease }) => (
  <View style={styles.earningsCard}>
    <Text style={styles.cardTitle}>Total Earnings</Text>
    <Text style={styles.cardTitle}>from {crop}</Text>
    <Text style={[styles.cardSubtitle, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
      This Month
    </Text>
    <Text style={[styles.earningsAmount, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
      ₦{amount}
    </Text>
    <View style={[
      styles.percentageContainer,
      { 
        borderColor: isIncrease ? COLORS.green : COLORS.orange,
        backgroundColor: isIncrease ? COLORS.lightGreen : COLORS.lightOrange,
      }
    ]}>
      <MaterialCommunityIcons
        name={isIncrease ? 'arrow-up' : 'arrow-down'}
        size={16}
        color={isIncrease ? COLORS.green : COLORS.orange}
      />
      <Text style={[styles.percentageText, { color: isIncrease ? COLORS.green : COLORS.orange }]}>
        {' '}{percentage}%
      </Text>
    </View>
    <Text style={styles.vsLastMonthText}>vs Last Month</Text>
  </View>
);

const FarmCard = ({ location, fieldName, harvestDate, yieldValue, imageUri }) => (
  <ImageBackground
    source={{ uri: imageUri }}
    style={styles.farmCard}
    imageStyle={{ borderRadius: 20 }}
  >
    <View style={styles.farmCardOverlay}>
      <Text style={styles.farmLocation}>{location}</Text>
      <Text style={styles.farmName}>{fieldName}</Text>
      <View style={styles.farmDetails}>
        <Text style={styles.farmInfoText}>Harvest on {harvestDate}</Text>
        <Text style={styles.farmInfoText}>{yieldValue}</Text>
      </View>
    </View>
  </ImageBackground>
);

const AlertCard = ({ title, date }) => (
  <View style={styles.alertCard}>
    <View style={{flex: 1, marginRight: 10}}>
      <Text style={styles.alertTitle}>{title}</Text>
      <Text style={styles.alertDate}>{date}</Text>
    </View>
    <TouchableOpacity style={styles.markDoneButton}>
      <Text style={styles.markDoneText}>Mark as Done</Text>
    </TouchableOpacity>
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
              <TouchableOpacity onPress={() => router.push('myFarm')}>
                <Text style={styles.viewAllText}>VIEW ALL FARM</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FarmCard
                location="Zara Village"
                fieldName="Orange Field"
                harvestDate="January 1, 2025"
                yieldValue="90.0KG / HA"
                imageUri="https://images.unsplash.com/photo-1536657464919-892534f60d6e?q=80&w=2074&auto=format&fit=crop"
              />
              <FarmCard
                location="Kano State"
                fieldName="Tomato Patch"
                harvestDate="March 15, 2025"
                yieldValue="75.5KG / HA"
                imageUri="https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2070&auto=format&fit=crop"
              />
            </ScrollView>
          </View>

          {/* Active Alerts Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Alerts</Text>
              <TouchableOpacity>
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

const COLORS = {
  primary: '#34A853',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F5',
  gray: '#8A8A8A',
  darkGray: '#333333',
  green: '#34A853',
  lightGreen: 'rgba(52, 168, 83, 0.1)',
  orange: '#F39C12',
  lightOrange: 'rgba(243, 156, 18, 0.1)',
};

const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xl: 20,
  xxl: 24,
  h1: 25,
};

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
  earningsCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 15,
  },
  cardTitle: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: SIZES.font,
    marginTop: 4,
  },
  earningsAmount: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  percentageText: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
  vsLastMonthText: {
    marginTop: 8,
    fontSize: SIZES.small,
    color: COLORS.gray,
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
  alertCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    fontWeight: '600',
    lineHeight: 22,
  },
  alertDate: {
    fontSize: SIZES.font,
    color: COLORS.green,
    marginTop: 5,
  },
  markDoneButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: COLORS.orange,
    borderRadius: 20,
  },
  markDoneText: {
    color: COLORS.orange,
    fontWeight: 'bold',
    fontSize: SIZES.font,
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
});

export default DashboardScreen;