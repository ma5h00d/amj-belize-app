// App.js - Main entry point for AMJ Belize Community App

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Create Bottom Tab Navigator instance
const Tab = createBottomTabNavigator();

/* -------------------------------------------------------------------------- */
/*                              SHARED HEADER                                 */
/* -------------------------------------------------------------------------- */

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>AMJ BELIZE</Text>
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>🕌</Text>
      </View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                             TAB SCREEN 1: TIMES                            */
/* -------------------------------------------------------------------------- */

const PrayerTimesScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute to keep the "NEXT" highlight accurate
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Format dynamic today date string
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);

  // Prayer schedules for Belize (24-hour equivalents used for logical comparison)
  const prayerData = [
    { name: 'Fajr', time: '4:45 AM', hour: 4, minute: 45 },
    { name: 'Zuhr', time: '1:00 PM', hour: 13, minute: 0 },
    { name: 'Asr', time: '3:30 PM', hour: 15, minute: 30 },
    { name: 'Maghrib', time: '6:30 PM', hour: 18, minute: 30 },
    { name: 'Isha', time: '6:30 PM', hour: 18, minute: 30 },
  ];

  // Calculate current minutes since midnight
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Find the index of the next upcoming prayer
  let nextPrayerIndex = prayerData.findIndex(prayer => {
    const prayerMinutes = prayer.hour * 60 + prayer.minute;
    return prayerMinutes > currentMinutes;
  });

  // If all prayers for today have passed, highlight Fajr as the next upcoming prayer
  if (nextPrayerIndex === -1) {
    nextPrayerIndex = 0;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top Green Banner */}
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>PRAYER TIMES</Text>
          <Text style={styles.bannerMainTitle}>Belize</Text>
          <View style={styles.divider} />
          <View style={styles.dateSelectorRow}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.todaySubText}>TODAY</Text>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>
        </View>

        {/* Prayer Time Cards with Dynamic "NEXT" Highlight */}
        {prayerData.map((item, index) => {
          const isNext = index === nextPrayerIndex;

          return (
            <View 
              key={index} 
              style={[
                styles.prayerRowCard, 
                isNext && styles.nextPrayerHighlight
              ]}
            >
              <View style={styles.prayerNameContainer}>
                {isNext && <View style={styles.greenDot} />}
                <Text style={[styles.prayerNameText, isNext && styles.nextPrayerText]}>
                  {item.name}
                </Text>
                {isNext && (
                  <View style={styles.nextBadge}>
                    <Text style={styles.nextBadgeText}>NEXT</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.prayerTimeText, isNext && styles.nextPrayerText]}>
                {item.time}
              </Text>
            </View>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                            PLACEHOLDER SCREENS                             */
/* -------------------------------------------------------------------------- */

const EventsScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.centeredView}>
      <Text style={styles.placeholderText}>Events Screen Content</Text>
    </View>
  </SafeAreaView>
);

const TasbihScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.centeredView}>
      <Text style={styles.placeholderText}>Digital Tasbih Screen Content</Text>
    </View>
  </SafeAreaView>
);

const QiblaScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.centeredView}>
      <Text style={styles.placeholderText}>Qibla Compass Screen Content</Text>
    </View>
  </SafeAreaView>
);

const CalendarScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.centeredView}>
      <Text style={styles.placeholderText}>Calendar View Screen Content</Text>
    </View>
  </SafeAreaView>
);

const SettingsScreen = () => (
  <SafeAreaView style={styles.container}>
    <AppHeader />
    <View style={styles.centeredView}>
      <Text style={styles.placeholderText}>Settings Screen Content</Text>
    </View>
  </SafeAreaView>
);

/* -------------------------------------------------------------------------- */
/*                             MAIN NAVIGATION                                */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#005D3A',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Times') iconName = 'time-outline';
            else if (route.name === 'Events') iconName = 'list-outline';
            else if (route.name === 'Tasbih') iconName = 'disc-outline';
            else if (route.name === 'Qibla') iconName = 'compass-outline';
            else if (route.name === 'Calendar') iconName = 'calendar-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Times" component={PrayerTimesScreen} />
        <Tab.Screen name="Events" component={EventsScreen} />
        <Tab.Screen name="Tasbih" component={TasbihScreen} />
        <Tab.Screen name="Qibla" component={QiblaScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* -------------------------------------------------------------------------- */
/*                               STYLESHEET                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },

  // Header Styling
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#003B25',
    letterSpacing: 0.5,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
  },

  // Green Banner Styling
  greenBannerCard: {
    backgroundColor: '#005D3A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  bannerSubLabel: {
    color: '#A2E2C4',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  bannerMainTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 15,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todaySubText: {
    color: '#A2E2C4',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },

  // Prayer List Row Styling
  prayerRowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  nextPrayerHighlight: {
    backgroundColor: '#EDFDF5',
    borderWidth: 1.5,
    borderColor: '#22C55E',
  },
  prayerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
    marginRight: 8,
  },
  prayerNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
  nextPrayerText: {
    color: '#005D3A',
    fontWeight: '700',
  },
  prayerTimeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003B25',
  },
  nextBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  nextBadgeText: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '800',
  },
});