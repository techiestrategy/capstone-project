import { AntDesign } from '@expo/vector-icons'; // For icons like back arrow, settings, user, list
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

// Main App component
export default function App() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [smsAlertsEnabled, setSmsAlertsEnabled] = useState(false);
  const [weatherForecastEnabled, setWeatherForecastEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleGoBack = () => {
  
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('index'); // or '/(tabs)/dashboard' depending on your route
    }
  
    };

  return (
    <View style={styles.outerContainer}> 
      {/* Header - This part will now be fixed */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        {/* General Settings Section */}
        <View style={styles.sectionHeader}>
          <AntDesign name="setting" size={20} color="white" style={styles.sectionIcon} />
          <Text style={styles.sectionHeaderText}>General Settings</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotificationsEnabled(previousState => !previousState)}
              value={notificationsEnabled}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>SMS Alerts</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={smsAlertsEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setSmsAlertsEnabled(previousState => !previousState)}
              value={smsAlertsEnabled}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>Show Weather Forecast</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={weatherForecastEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setWeatherForecastEnabled(previousState => !previousState)}
              value={weatherForecastEnabled}
            />
          </View>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Language Preference pressed')}>
            <Text style={styles.rowText}>Language Preference</Text>
            <AntDesign name="right" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Account Settings Section */}
        <View style={styles.sectionHeader}>
          <AntDesign name="user" size={20} color="white" style={styles.sectionIcon} />
          <Text style={styles.sectionHeaderText}>Account Settings</Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Change Email Address pressed')}>
            <Text style={styles.rowText}>Change Email Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Change Password pressed')}>
            <Text style={styles.rowText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Two-Factor Authentication pressed')}>
            <Text style={styles.rowText}>Two-Factor Authentication</Text>
          </TouchableOpacity>
        </View>

        {/* More Section */}
        <View style={styles.sectionHeader}>
          <AntDesign name="bars" size={20} color="white" style={styles.sectionIcon} />
          <Text style={styles.sectionHeaderText}>More</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Theme</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setDarkModeEnabled(previousState => !previousState)}
              value={darkModeEnabled}
            />
          </View>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Support pressed')}>
            <Text style={styles.rowText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={() => console.log('Delete Account pressed')}>
            <Text style={styles.rowText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Log out */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Log out pressed')}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 50, // Adjust for status bar
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15, // Apply padding here to align with scroll content
    backgroundColor: '#f0f0f0', // Match background if header needs a distinct color
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  scrollViewContent: {
    flex: 1, // Make sure ScrollView takes available space
    paddingHorizontal: 15, // Apply horizontal padding to the scrollable content
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745', // Green background
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  logoutButtonText: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
