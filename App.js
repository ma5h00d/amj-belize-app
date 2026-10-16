// App.js - Main entry point for AMJ Belize Community App

import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Platform, 
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
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
      <Image 
        source={require('./assets/markup_147372.png')} 
        style={styles.headerImage} 
      />
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

  // Format dynamic today date string (e.g. "Friday, October 16")
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);

  // Prayer schedules for Belize
  const prayerData = [
    { name: 'Fajr', time: '4:45 AM', hour: 4, minute: 45 },
    { name: 'Zuhr', time: '1:00 PM', hour: 13, minute: 0 },
    { name: 'Asr', time: '3:30 PM', hour: 15, minute: 30 },
    { name: 'Maghrib', time: '6:30 PM', hour: 18, minute: 30 },
    { name: 'Isha', time: '6:30 PM', hour: 18, minute: 30 },
  ];

  // Calculate current minutes since midnight
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  // Find index of the next upcoming prayer
  let nextPrayerIndex = prayerData.findIndex(prayer => {
    const prayerMinutes = prayer.hour * 60 + prayer.minute;
    return prayerMinutes > currentMinutes;
  });

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
/*                       TAB SCREEN 2: ANNOUNCEMENTS                          */
/* -------------------------------------------------------------------------- */

const AnnouncementsScreen = () => {
  // Toggle this: true = Imam (shows input bar), false = Regular Member (read-only)
  const isImam = true; 

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Imam',
      text: 'Assalamu Alaikum. Jummah prayer tomorrow will begin at 1:00 PM inshaAllah.',
      time: 'Today, 2:15 PM',
    },
    {
      id: '2',
      sender: 'Imam',
      text: 'Reminder: Community potluck this Sunday after Asr prayer.',
      time: 'Yesterday, 6:00 PM',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newEntry = {
      id: Date.now().toString(),
      sender: 'Imam',
      text: newMessage,
      time: 'Just now',
    };

    setMessages([newEntry, ...messages]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        
        {/* Messages List */}
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 10 }}>
          {messages.map((msg) => (
            <View key={msg.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <Text style={styles.senderBadge}>🕌 {msg.sender}</Text>
                <Text style={styles.timestampText}>{msg.time}</Text>
              </View>
              <Text style={styles.messageContent}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Input Bar - ONLY VISIBLE TO THE IMAM */}
        {isImam && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Broadcast an announcement..."
              placeholderTextColor="#A0AEC0"
              value={newMessage}
              onChangeText={setNewMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                            PLACEHOLDER SCREENS                             */
/* -------------------------------------------------------------------------- */

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
            else if (route.name === 'Announce') iconName = 'megaphone-outline';
            else if (route.name === 'Tasbih') iconName = 'disc-outline';
            else if (route.name === 'Qibla') iconName = 'compass-outline';
            else if (route.name === 'Calendar') iconName = 'calendar-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Times" component={PrayerTimesScreen} />
        <Tab.Screen name="Announce" component={AnnouncementsScreen} />
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
  headerImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
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
    justify.content: 'space-between',
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

  // Announcement Screen Styling
  announcementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#005D3A',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  senderBadge: {
    fontWeight: '700',
    color: '#005D3A',
    fontSize: 14,
  },
  timestampText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  messageContent: {
    fontSize: 15,
    color: '#2D3748',
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8F9FA',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    marginRight: 8,
    color: '#2D3748',
  },
  sendButton: {
    backgroundColor: '#005D3A',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
});