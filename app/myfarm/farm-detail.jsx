// screens/FarmDetailScreen.js
import AlertCard from '@/components/AlertCard'; // Reused component
import EarningsCard from '@/components/EarningsCard'; // Reused component
import FarmDetailCard from '@/components/FarmDetailCard'; // New component
import StatCard from '@/components/StatCard'; // New component
import { COLORS, SIZES } from '@/constants/ThemeColors'; // Direct import
import { useLocalSearchParams } from 'expo-router'; // To get dynamic data
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- Mock Data ---
// const MOCK_FARM_DATA = {
//   id: '1',
//   name: 'Orange Field',
//   location: 'Zara Village',
//   imageUri: 'https://images.unsplash.com/photo-1579547631720-d384074219a6?q=80&w=1974&auto=format&fit=crop', // Placeholder orange farm image
//   harvestDate: 'January 1, 2025',
//   yieldValue: '80.0KG / HA',
// };

const MOCK_EARNINGS_DATA = {
  crop: 'Orange',
  amount: '50.0M',
  percentage: '36.50',
  isIncrease: true,
};

const MOCK_HARVEST_COUNT = {
  title: 'Total Harvest count',
  value: '5times',
  percentage: '36.50',
  isIncrease: true,
  period: 'This Year',
};

const MOCK_HIGHEST_YIELD = {
  title: 'Highest harvest yield',
  value: '150.0KG',
  percentage: '36.50',
  isIncrease: false,
  period: 'Year 2025',
};

const MOCK_ALERTS = [
  { id: 'alert1', title: 'Feed the Fish with the new feeds', date: 'June 5, 2025' },
  { id: 'alert2', title: 'Begin Pruning of Plantain by October', date: 'October 1, 2025' },
];

const FarmDetailScreen = ({ navigation }) => {
  // Use useLocalSearchParams to potentially get the farm name/ID
  const { farmId } = useLocalSearchParams();
  const screenTitle = paramFarmName || MOCK_FARM_DATA.name;

  // const MOCK_FARM_DATA = {
  //   id: farmId ,
  //   name: 'Orange Field',
  // location: 'Zara Village',
  // imageUri: 'https://images.unsplash.com/photo-1579547631720-d384074219a6?q=80&w=1974&auto=format&fit=crop', // Placeholder orange farm image
  // harvestDate: 'January 1, 2025',
  // yieldValue: '80.0KG / HA',
  // };

  const FARM_MAP = {
  '1': {
    name: 'Orange Field',
    location: 'Zara Village',
    imageUri: '...',
    harvestDate: 'January 1, 2025',
    yieldValue: '80.0KG / HA',
  },
  '2': {
    name: 'Maize Field',
    location: 'Odoguyan Village',
    imageUri: '...',
    harvestDate: 'March 1, 2025',
    yieldValue: '100KG / HA',
  },
  // etc...
};

const MOCK_FARM_DATA = { id: farmId, ...FARM_MAP[farmId] };

  const handleGoBack = () => {
    if (navigation && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log('Cannot go back from FarmDetailScreen.');
    }
  };

  const handleMarkAlertAsDone = (alertId) => {
    console.log(`Marking alert ${alertId} as done.`);
    // In a real app, you'd update state or send an API request
    alert(`Alert ${alertId} marked as done.`);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: COLORS.borderColor, backgroundColor: COLORS.cardBackground }]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: COLORS.black }]}>{screenTitle}</Text>
        <View style={styles.headerIconPlaceholder} /> {/* Placeholder for consistent spacing */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Main Farm Detail Card */}
        <FarmDetailCard item={MOCK_FARM_DATA} onPress={() => console.log('Farm detail card pressed')} />

        {/* Earnings Card */}
        <View style={styles.section}>
          <EarningsCard
            crop={MOCK_EARNINGS_DATA.crop}
            amount={MOCK_EARNINGS_DATA.amount}
            percentage={MOCK_EARNINGS_DATA.percentage}
            isIncrease={MOCK_EARNINGS_DATA.isIncrease}
          />
        </View>

        {/* Harvest Stats Section */}
        <View style={[styles.section, styles.statCardsRow]}>
          <StatCard
            title={MOCK_HARVEST_COUNT.title}
            value={MOCK_HARVEST_COUNT.value}
            percentage={MOCK_HARVEST_COUNT.percentage}
            isIncrease={MOCK_HARVEST_COUNT.isIncrease}
            period={MOCK_HARVEST_COUNT.period}
          />
          <View style={{ width: SIZES.margin }} /> {/* Space between cards */}
          <StatCard
            title={MOCK_HIGHEST_YIELD.title}
            value={MOCK_HIGHEST_YIELD.value}
            percentage={MOCK_HIGHEST_YIELD.percentage}
            isIncrease={MOCK_HIGHEST_YIELD.isIncrease}
            period={MOCK_HIGHEST_YIELD.period}
          />
        </View>

        {/* Active Alerts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: COLORS.black }]}>Active Alerts</Text>
            <TouchableOpacity onPress={() => console.log('View all alerts')}>
              <Text style={[styles.viewAllText, { color: COLORS.gray }]}>VIEW ALL ALERTS</Text>
            </TouchableOpacity>
          </View>
          {MOCK_ALERTS.map((alert) => (
            <AlertCard key={alert.id} title={alert.title} date={alert.date} onMarkAsDone={() => handleMarkAlertAsDone(alert.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
  },
  headerIcon: {
    padding: SIZES.base,
  },
  headerTitle: {
    fontSize: SIZES.xxl,
    fontWeight: 'bold',
  },
  headerIconPlaceholder: {
    width: SIZES.xxl + SIZES.base * 2, // Match size of icon button
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  section: {
    marginBottom: SIZES.padding,
  },
  statCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: SIZES.xl,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: SIZES.font,
    fontWeight: '500',
  },
});

export default FarmDetailScreen;