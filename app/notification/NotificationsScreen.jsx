// screens/NotificationsScreen.js
import NoNotificationsYet from '@/components/NoNotificationsYet';
import NotificationCard from '@/components/NotificationCard';
import { COLORS, SIZES } from '@/constants/ThemeColors';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
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

// --- Mock Notification Data ---
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Confirm your phone number',
    description: 'Please confirm your phone number to secure your account.',
    date: 'June 5, 2025',
    isRead: false,
    category: 'today',
  },
  {
    id: '2',
    title: 'Farm A new harvest record',
    description: 'A new harvest record has been logged for Orange Field.',
    date: 'June 5, 2025',
    isRead: false,
    category: 'today',
  },
  {
    id: '3',
    title: 'System Update Reminder',
    description: 'A system update is scheduled for tonight. Please save your work.',
    date: 'June 4, 2025',
    isRead: true,
    category: 'yesterday',
  },
  {
    id: '4',
    title: 'New message from support',
    description: 'You have a new message from our support team regarding your query.',
    date: 'June 4, 2025',
    isRead: false,
    category: 'yesterday',
  },
  {
    id: '5',
    title: 'Weather Alert: Heavy Rain',
    description: 'Heavy rain expected in Zara Village. Take necessary precautions for your crops.',
    date: 'June 3, 2025',
    isRead: true,
    category: 'older',
  },
];

// --- Empty Mock Data for Testing "No Notifications Yet" ---
const EMPTY_MOCK_NOTIFICATIONS = [];

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('Unread'); // 'Unread' or 'All'

  useEffect(() => {
    // For testing 'no notifications yet', uncomment the line below:
    // setNotifications(EMPTY_MOCK_NOTIFICATIONS);

    // For testing with data, uncomment the line below:
    setNotifications(MOCK_NOTIFICATIONS);
  }, []);

  const getFilteredNotifications = () => {
    if (activeTab === 'All') {
      return notifications;
    }
    return notifications.filter(notif => !notif.isRead);
  };

  const hasNotifications = getFilteredNotifications().length > 0;

  const groupedNotifications = getFilteredNotifications().reduce((acc, notif) => {
    const category = notif.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(notif);
    return acc;
  }, {});

  const sortedCategories = ['today', 'yesterday', 'older'].filter(
    cat => groupedNotifications[cat]?.length > 0
  );

  const handleGoBack = () => {

  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('index'); // or '/(tabs)/dashboard' depending on your route
  }

  };

  
  const handleDeleteAll = () => {
    setNotifications([]);
    alert('All notifications deleted!');
  };

  const renderNotificationItem = ({ item }) => (
    <NotificationCard
      title={item.title}
      description={item.description}
      date={item.date}
      isRead={item.isRead}
    />
  );

  const renderSection = ({ item: section }) => ( // Renamed 'section' to 'item' for FlatList rendering
    <View style={styles.notificationSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {activeTab === 'All' && section.data.length > 0 && section.title === 'Today' && (
          <TouchableOpacity onPress={handleDeleteAll}>
            <Text style={styles.deleteAllText}>Delete all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={section.data}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  // Transform grouped data into a format suitable for a FlatList that renders sections
  const sections = sortedCategories.map(cat => ({
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    data: groupedNotifications[cat],
  }));

  const handleSettings = () => {
    // Navigate to forgot password screen
    router.push('settings/SettingsScreen')
    console.log('Navigating to Settings');
  };

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={SIZES.xxl} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
       
<TouchableOpacity style={styles.headerIcon} onPress={handleSettings}>
  <Ionicons name="settings-outline" size={SIZES.large} color={COLORS.gray} />
</TouchableOpacity>
      </View>

      {hasNotifications ? (
        <View style={styles.contentContainer}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Unread' && styles.activeTab]}
              onPress={() => setActiveTab('Unread')}
            >
              <Text style={[styles.tabText, activeTab === 'Unread' && styles.activeTabText]}>
                Unread ({notifications.filter(notif => !notif.isRead).length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'All' && styles.activeTab]}
              onPress={() => setActiveTab('All')}
            >
              <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>
                All ({notifications.length})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Notifications List (using FlatList for sections) */}
          <FlatList
            data={sections}
            renderItem={renderSection}
            keyExtractor={(section) => section.title}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      ) : (
        // No Notifications Yet Screen
        <NoNotificationsYet onGoBack={handleGoBack} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingTop: 40,
  },
  headerIcon: {
    padding: SIZES.base,
  },
  headerTitle: {
    fontSize: 20, // Using SIZES.xxl
    fontWeight: 'bold',
    color: COLORS.black,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius, // Using SIZES.radius (8)
    marginBottom: SIZES.padding,
    alignSelf: 'center',
  },
  tabButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius, // Using SIZES.radius (8)
  },
  activeTab: {
    backgroundColor: COLORS.farmInventoryOrange, // Replaced COLORS.blue
  },
  tabText: {
    fontSize: SIZES.medium, // Using SIZES.medium
    color: COLORS.darkGray,
  },
  activeTabText: {
    color: COLORS.white,
  },
  listContainer: {
    paddingBottom: SIZES.padding,
  },
  notificationSection: {
    marginBottom: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  sectionTitle: {
    fontSize: SIZES.large, // Using SIZES.large
    fontWeight: 'bold',
    color: COLORS.black,
  },
  deleteAllText: {
    fontSize: SIZES.medium, // Using SIZES.medium
    color: COLORS.farmInventoryOrange, // Replaced COLORS.blue
  },
});

export default NotificationsScreen;