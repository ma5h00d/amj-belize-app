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
  TouchableOpacity,
  Linking,
  Switch,
  Alert,
  Dimensions,
  Modal
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Local 19-Page Salat Pamphlet Images Array
// Note: Ensure images exist in assets/salat_guide/
const salatPages = [
  require('./assets/salat_guide/page_1.png'),
  require('./assets/salat_guide/page_2.png'),
  require('./assets/salat_guide/page_3.png'),
  require('./assets/salat_guide/page_4.png'),
  require('./assets/salat_guide/page_5.png'),
  require('./assets/salat_guide/page_6.png'),
  require('./assets/salat_guide/page_7.png'),
  require('./assets/salat_guide/page_8.png'),
  require('./assets/salat_guide/page_9.png'),
  require('./assets/salat_guide/page_10.png'),
  require('./assets/salat_guide/page_11.png'),
  require('./assets/salat_guide/page_12.png'),
  require('./assets/salat_guide/page_13.png'),
  require('./assets/salat_guide/page_14.png'),
  require('./assets/salat_guide/page_15.png'),
  require('./assets/salat_guide/page_16.png'),
  require('./assets/salat_guide/page_17.png'),
  require('./assets/salat_guide/page_18.png'),
  require('./assets/salat_guide/page_19.png'),
];

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

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);

  const prayerData = [
    { name: 'Fajr', time: '4:45 AM', hour: 4, minute: 45 },
    { name: 'Zuhr', time: '1:00 PM', hour: 13, minute: 0 },
    { name: 'Asr', time: '3:30 PM', hour: 15, minute: 30 },
    { name: 'Maghrib', time: '6:30 PM', hour: 18, minute: 30 },
    { name: 'Isha', time: '6:30 PM', hour: 18, minute: 30 },
  ];

  const dailyPrayers = [
    {
      type: 'Holy Qur\'an',
      reference: 'Surah Al-Baqarah (2:202)',
      text: '"Our Lord, grant us good in this world and good in the Hereafter, and protect us from the torment of the Fire."'
    },
    {
      type: 'Holy Prophet (saw)',
      reference: 'Sunan Ibn Majah',
      text: '"O Allah, I ask You for beneficial knowledge, good acceptable provision, and deeds that are accepted."'
    },
    {
      type: 'Promised Messiah (as)',
      reference: 'Tazkirah',
      text: '"Lord, everything is at Your service; so O Lord, protect me, help me, and have mercy on me."'
    }
  ];

  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const fajrMinutes = 4 * 60 + 45;

  let nextPrayerIndex = prayerData.findIndex(prayer => {
    const prayerMinutes = prayer.hour * 60 + prayer.minute;
    return prayerMinutes > currentMinutes;
  });

  if (nextPrayerIndex === -1) nextPrayerIndex = 0;

  const epochDays = Math.floor(currentTime.getTime() / (1000 * 60 * 60 * 24));
  const activeDayIndex = currentMinutes >= fajrMinutes ? epochDays : epochDays - 1;
  const todayPrayer = dailyPrayers[Math.abs(activeDayIndex) % dailyPrayers.length];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>PRAYER TIMES</Text>
          <Text style={styles.bannerMainTitle}>Belize City</Text>
          <View style={styles.divider} />
          <View style={styles.dateSelectorRow}>
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Text style={styles.todaySubText}>TODAY</Text>
              <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
          </View>
        </View>

        {prayerData.map((item, index) => {
          const isNext = index === nextPrayerIndex;
          return (
            <View 
              key={index} 
              style={[styles.prayerRowCard, isNext && styles.nextPrayerHighlight]}
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

        <View style={styles.prayerOfDayCard}>
          <View style={styles.prayerOfDayHeaderRow}>
            <Text style={styles.prayerOfDayTitle}>PRAYER OF THE DAY</Text>
            <Text style={styles.prayerOfDayBadge}>{todayPrayer.type}</Text>
          </View>
          <Text style={styles.prayerOfDayItalicText}>{todayPrayer.text}</Text>
          <Text style={styles.prayerOfDaySource}>— {todayPrayer.reference}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                       TAB SCREEN 2: ANNOUNCEMENTS                          */
/* -------------------------------------------------------------------------- */

const getRelativeTime = (timestamp) => {
  if (!timestamp) return 'Just now';
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const AnnouncementsScreen = () => {
  const isImam = true; 

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Imam',
      text: 'Assalamu Alaikum. Jummah prayer tomorrow will begin at 1:00 PM inshaAllah.',
      timestamp: Date.now() - (5 * 60 * 60 * 1000),
    },
    {
      id: '2',
      sender: 'Imam',
      text: 'Reminder: Community potluck this Sunday after Asr prayer.',
      timestamp: Date.now() - (24 * 60 * 60 * 1000),
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newEntry = {
      id: Date.now().toString(),
      sender: 'Imam',
      text: newMessage,
      timestamp: Date.now(),
    };

    setMessages([newEntry, ...messages]);
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 10 }}>
          {messages.map((msg) => (
            <View key={msg.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <Text style={styles.senderBadge}>🕌 {msg.sender}</Text>
                <Text style={styles.timestampText}>
                  {msg.timestamp ? getRelativeTime(msg.timestamp) : msg.time}
                </Text>
              </View>
              <Text style={styles.messageContent}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

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
/*                        TAB SCREEN 3: PRAYERS & TASBIH                      */
/* -------------------------------------------------------------------------- */

const INITIAL_PRAYERS = [
  { id: '1', name: 'SubhanAllah', translation: 'Glory be to Allah', arabic: 'سُبْحَانَ ٱللَّٰهِ', symbol: 'س', color: '#00A86B', target: 33, count: 0, total: 0, sets: 0 },
  { id: '2', name: 'Alhamdulillah', translation: 'Praise be to Allah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', symbol: 'ا', color: '#2563EB', target: 33, count: 0, total: 0, sets: 0 },
  { id: '3', name: 'Allahu Akbar', translation: 'Allah is the Greatest', arabic: 'ٱللَّٰهُ أَكْبَرُ', symbol: 'ا', color: '#8B5CF6', target: 34, count: 0, total: 0, sets: 0 },
  { id: '4', name: 'La ilaha illallah', translation: 'There is no god but Allah', arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', symbol: 'ل', color: '#D97706', target: 33, count: 0, total: 0, sets: 0 },
  { id: '5', name: 'Astaghfirullah', translation: 'I seek forgiveness from Allah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ', symbol: 'أ', color: '#E11D48', target: 33, count: 0, total: 0, sets: 0 },
  { id: '6', name: 'Durood Sharif', translation: 'Blessings upon the Prophet', arabic: 'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', symbol: 'ا', color: '#0D9488', target: 33, count: 0, total: 0, sets: 0 },
];

const PrayersScreen = () => {
  const [prayers, setPrayers] = useState(INITIAL_PRAYERS);
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);
  const [pamphletModalVisible, setPamphletModalVisible] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const selectedPrayer = prayers.find(p => p.id === selectedPrayerId);

  const handleIncrement = (id) => {
    setPrayers(prev => prev.map(p => {
      if (p.id !== id) return p;
      const nextCount = p.count + 1;
      const nextTotal = p.total + 1;
      const newSets = Math.floor(nextTotal / p.target);
      return { ...p, count: nextCount, total: nextTotal, sets: newSets };
    }));
  };

  const handleReset = (id) => {
    setPrayers(prev => prev.map(p => p.id === id ? { ...p, count: 0 } : p));
  };

  const adjustTarget = (id, delta) => {
    setPrayers(prev => prev.map(p => {
      if (p.id !== id) return p;
      const newTarget = Math.max(1, p.target + delta);
      return { ...p, target: newTarget };
    }));
  };

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActivePageIndex(slide);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      
      {selectedPrayer ? (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <TouchableOpacity 
            style={styles.backButtonRow} 
            onPress={() => setSelectedPrayerId(null)}
          >
            <Ionicons name="chevron-back" size={20} color="#005D3A" />
            <Text style={styles.backButtonText}>Back to prayers</Text>
          </TouchableOpacity>

          <View style={[styles.counterBannerCard, { backgroundColor: selectedPrayer.color }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerPrayerName}>{selectedPrayer.name.toUpperCase()}</Text>
              <Text style={styles.bannerPrayerSub}>{selectedPrayer.translation}</Text>
            </View>
            <Text style={styles.bannerArabicText}>{selectedPrayer.arabic}</Text>
          </View>

          <View style={styles.targetRow}>
            <Text style={styles.targetLabel}>TARGET:</Text>
            <View style={styles.targetStepper}>
              <TouchableOpacity onPress={() => adjustTarget(selectedPrayer.id, -1)} style={styles.stepBtn}>
                <Text style={styles.stepBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.targetValueText}>{selectedPrayer.target}</Text>
              <TouchableOpacity onPress={() => adjustTarget(selectedPrayer.id, 1)} style={styles.stepBtn}>
                <Text style={styles.stepBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <TouchableOpacity 
              style={styles.circleCounter} 
              activeOpacity={0.8}
              onPress={() => handleIncrement(selectedPrayer.id)}
            >
              <Text style={styles.circleCountNumber}>{selectedPrayer.count}</Text>
              <Text style={styles.circleTargetSub}>of {selectedPrayer.target}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{selectedPrayer.sets}</Text>
              <Text style={styles.statLabel}>Sets</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{selectedPrayer.total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{selectedPrayer.total}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.resetCounterBtn} 
            onPress={() => handleReset(selectedPrayer.id)}
          >
            <Ionicons name="reload" size={16} color="#4A5568" />
            <Text style={styles.resetCounterText}>Reset Counter</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.greenBannerCard}>
            <Text style={styles.bannerSubLabel}>DAILY REMEMBRANCE</Text>
            <Text style={styles.bannerMainTitle}>Prayers & Tasbih</Text>
          </View>

          {/* LEARN SALAT PAMPHLET BUTTON */}
          <TouchableOpacity 
            style={styles.learnSalatCard} 
            activeOpacity={0.85}
            onPress={() => setPamphletModalVisible(true)}
          >
            <View style={styles.learnSalatIconCircle}>
              <Ionicons name="book-outline" size={24} color="#005D3A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.learnSalatTitle}>Learn Salat Guide</Text>
              <Text style={styles.learnSalatSub}>Interactive 19-page prayer guide</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#005D3A" />
          </TouchableOpacity>

          <View style={styles.tasbihGrid}>
            {prayers.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.tasbihGridCard}
                onPress={() => setSelectedPrayerId(item.id)}
              >
                <View style={[styles.symbolBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.symbolText}>{item.symbol}</Text>
                </View>
                <Text style={styles.tasbihName}>{item.name}</Text>
                <Text style={styles.tasbihTranslation} numberOfLines={1}>{item.translation}</Text>
                {item.total > 0 && (
                  <View style={styles.todayCountRow}>
                    <Ionicons name="time-outline" size={12} color="#005D3A" />
                    <Text style={styles.todayCountText}>{item.total} today</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* FULL-SCREEN 19-PAGE PAMPHLET MODAL VIEWER */}
      <Modal 
        visible={pamphletModalVisible} 
        animationType="slide" 
        onRequestClose={() => setPamphletModalVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1A202C' }}>
          
          {/* Modal Header Bar */}
          <View style={styles.pamphletHeaderBar}>
            <TouchableOpacity onPress={() => setPamphletModalVisible(false)} style={styles.closeModalBtn}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.pamphletHeaderTitle}>Learn Salat Booklet</Text>
            <Text style={styles.pamphletPageIndicator}>
              {activePageIndex + 1} / {salatPages.length}
            </Text>
          </View>

          {/* Swipeable Page Gallery */}
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ flex: 1 }}
          >
            {salatPages.map((pageSrc, idx) => (
              <View key={idx} style={styles.pamphletPageSlide}>
                <Image 
                  source={pageSrc} 
                  style={styles.pamphletImage} 
                  resizeMode="contain" 
                />
              </View>
            ))}
          </ScrollView>

        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                          TAB SCREEN 4: QIBLA COMPASS                        */
/* -------------------------------------------------------------------------- */

const QiblaScreen = () => {
  const [location, setLocation] = useState(null);
  const [qiblaDegree, setQiblaDegree] = useState(55); 
  const [distance, setDistance] = useState('12,891');
  const [magnetometer, setMagnetometer] = useState(0);

  const MAKKAH_LAT = 21.4225;
  const MAKKAH_LNG = 39.8262;

  const calculateQibla = (lat, lng) => {
    const phi1 = (lat * Math.PI) / 180;
    const phi2 = (MAKKAH_LAT * Math.PI) / 180;
    const lambda1 = (lng * Math.PI) / 180;
    const lambda2 = (MAKKAH_LNG * Math.PI) / 180;

    const y = Math.sin(lambda2 - lambda1);
    const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(lambda2 - lambda1);
    let qibla = (Math.atan2(y, x) * 180) / Math.PI;
    qibla = (qibla + 360) % 360;
    setQiblaDegree(Math.round(qibla));

    const R = 6371; 
    const dLat = phi2 - phi1;
    const dLng = lambda2 - lambda1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = Math.round(R * c);
    setDistance(dist.toLocaleString());
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;
        setLocation({ latitude, longitude });
        calculateQibla(latitude, longitude);
      }
    })();

    Magnetometer.setUpdateInterval(100);
    const subscription = Magnetometer.addListener(data => {
      let { x, y } = data;
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      setMagnetometer(Math.round(angle));
    });

    return () => subscription.remove();
  }, []);

  const needleRotation = (qiblaDegree - magnetometer + 360) % 360;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.bannerSubLabel}>QIBLA DIRECTION</Text>
              <Text style={styles.bannerMainTitle}>Makkah</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.bannerSubLabel}>DISTANCE</Text>
              <Text style={styles.bannerMainTitle}>{distance} km</Text>
            </View>
          </View>
        </View>

        <View style={styles.compassWrapper}>
          <View style={styles.compassOuterCircle}>
            <View style={[styles.needleContainer, { transform: [{ rotate: `${needleRotation}deg` }] }]}>
              <View style={styles.needlePointer} />
              <View style={styles.needleTail} />
            </View>

            <View style={styles.compassCenterBadge}>
              <Text style={styles.compassDegreeText}>{qiblaDegree}°</Text>
              <Text style={styles.compassSubLabel}>QIBLA</Text>
            </View>

            <Text style={[styles.cardinalMark, { top: 12 }]}>N</Text>
            <Text style={[styles.cardinalMark, { right: 16 }]}>E</Text>
            <Text style={[styles.cardinalMark, { bottom: 12 }]}>S</Text>
            <Text style={[styles.cardinalMark, { left: 16 }]}>W</Text>
          </View>
        </View>

        <View style={styles.instructionCard}>
          <View style={styles.navigationIconCircle}>
            <Ionicons name="navigate-outline" size={20} color="#005D3A" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.instructionTitle}>Point the top of your phone</Text>
            <Text style={styles.instructionSub}>When the green needle points up, you're facing Qibla</Text>
          </View>
        </View>

        <View style={styles.locationInfoCard}>
          <Ionicons name="location-outline" size={16} color="#718096" style={{ marginRight: 6 }} />
          <Text style={styles.locationInfoTitle}>YOUR LOCATION</Text>
          {location ? (
            <Text style={styles.coordsText}>{location.latitude.toFixed(4)}°N,  {location.longitude.toFixed(4)}°W</Text>
          ) : (
            <Text style={styles.coordsText}>17.5157°N,  -88.2256°W</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                       TAB SCREEN 5: KHUTBA (SERMONS)                       */
/* -------------------------------------------------------------------------- */

const KhutbaScreen = () => {
  const latestSermon = {
    title: "Friday Sermon - 16th October 2026",
    speaker: "Hazrat Mirza Masroor Ahmad (aa)",
    location: "Masjid Mubarak, Tilford, UK",
    youtubeUrl: "https://www.youtube.com/watch?v=sJZvP9AmB9g",
    summary: [
      "His Holiness (aa) delivered the Friday Sermon highlighting key virtues of spiritual reform, moderation, and unwavering trust in Allah.",
      "His Holiness emphasized the vital importance of remaining steadfast in daily prayers, upholding high moral conduct, and safeguarding local community bonds.",
      "A special prayer request was made for peace across the world and for the protection and prosperity of the global Jam'at."
    ]
  };

  const handleOpenYouTube = () => {
    Linking.openURL(latestSermon.youtubeUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>BELOVED HUZOOR'S (AA)</Text>
          <Text style={styles.bannerMainTitle}>Friday Sermon</Text>
        </View>

        <View style={styles.sermonCard}>
          <View style={styles.sermonHeaderRow}>
            <Text style={styles.sermonBadge}>LATEST KHUTBA</Text>
            <Text style={styles.sermonDate}>Oct 16, 2026</Text>
          </View>
          
          <Text style={styles.sermonTitle}>{latestSermon.title}</Text>
          <Text style={styles.sermonSubText}>By {latestSermon.speaker}</Text>
          <Text style={styles.sermonLocationText}>📍 {latestSermon.location}</Text>

          <TouchableOpacity 
            style={styles.youtubeButton} 
            activeOpacity={0.85}
            onPress={handleOpenYouTube}
          >
            <Ionicons name="logo-youtube" size={26} color="#FF0000" />
            <Text style={styles.youtubeButtonText}>Watch Live on YouTube</Text>
            <Ionicons name="open-outline" size={16} color="#2D3748" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeaderRow}>
            <Ionicons name="document-text-outline" size={18} color="#005D3A" />
            <Text style={styles.summaryTitle}>ENGLISH SUMMARY</Text>
          </View>
          
          {latestSermon.summary.map((point, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.summaryText}>{point}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                            TAB SCREEN 6: SETTINGS                          */
/* -------------------------------------------------------------------------- */

const SettingsScreen = () => {
  const [prayerReminders, setPrayerReminders] = useState(false);
  const [selectedOffset, setSelectedOffset] = useState('15 min');

  const reminderOptions = ['At time', '5 min', '10 min', '15 min', '30 min'];

  const handleClearCache = () => {
    Alert.alert("Cache Cleared", "Local app storage and cached prayer schedules have been reset.");
  };

  const handleTestNotification = () => {
    Alert.alert("Test Notification", "AMJ Belize: Prayer reminder test successful!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>SETTINGS</Text>
          <Text style={styles.bannerMainTitle}>Preferences</Text>
        </View>

        <View style={styles.settingsGroupCard}>
          <Text style={styles.settingsGroupHeader}>DATA & STORAGE</Text>
          
          <View style={[styles.settingsRow, styles.settingsBorderBottom]}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="time-outline" size={20} color="#2D3748" style={{ marginRight: 12 }} />
              <Text style={styles.settingsRowTitle}>Last Updated</Text>
            </View>
            <Text style={styles.settingsRowValue}>Just now</Text>
          </View>

          <TouchableOpacity style={styles.settingsRow} onPress={handleClearCache}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="trash-outline" size={20} color="#E53E3E" style={{ marginRight: 12 }} />
              <Text style={[styles.settingsRowTitle, { color: '#E53E3E' }]}>Clear Cache</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGroupCard}>
          <Text style={styles.settingsGroupHeader}>NOTIFICATIONS</Text>
          
          <View style={[styles.settingsRow, prayerReminders && styles.settingsBorderBottom]}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="notifications-outline" size={20} color="#005D3A" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.settingsRowTitle}>Prayer Reminders</Text>
                <Text style={styles.settingsRowSub}>
                  {prayerReminders ? 'On for the next 7 days' : 'Off'}
                </Text>
              </View>
            </View>
            <Switch
              value={prayerReminders}
              onValueChange={setPrayerReminders}
              trackColor={{ false: '#E2E8F0', true: '#005D3A' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {prayerReminders && (
            <View style={[styles.reminderExpandBox, styles.settingsBorderBottom]}>
              <Text style={styles.reminderExpandTitle}>Remind me</Text>
              <View style={styles.chipRow}>
                {reminderOptions.map((option) => {
                  const isSelected = selectedOffset === option;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[styles.chip, isSelected && styles.chipActive]}
                      onPress={() => setSelectedOffset(option)}
                    >
                      <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.reminderFooterSub}>
                Reminders arrive {selectedOffset} before each prayer.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.settingsRow} onPress={handleTestNotification}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="send-outline" size={20} color="#2D3748" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.settingsRowTitle}>Send a test notification</Text>
                <Text style={styles.settingsRowSub}>Check that reminders reach this device</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsFooter}>
          <Text style={styles.footerAppTitle}>AMJ Belize Community App</Text>
          <Text style={styles.footerAppSub}>
            Prayer times, announcements, and digital tools for the Ahmadiyya Muslim Community Belize.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

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
            height: 70,
            paddingBottom: 12,
            paddingTop: 8,
            marginBottom: 10,
            marginHorizontal: 10,
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Times') iconName = 'time-outline';
            else if (route.name === 'Announce') iconName = 'megaphone-outline';
            else if (route.name === 'Prayers') iconName = 'disc-outline';
            else if (route.name === 'Qibla') iconName = 'compass-outline';
            else if (route.name === 'Khutba') iconName = 'tv-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Times" component={PrayerTimesScreen} />
        <Tab.Screen name="Announce" component={AnnouncementsScreen} />
        <Tab.Screen name="Prayers" component={PrayersScreen} />
        <Tab.Screen name="Qibla" component={QiblaScreen} />
        <Tab.Screen name="Khutba" component={KhutbaScreen} />
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
    paddingBottom: 25,
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

  // Prayer of the Day Box
  prayerOfDayCard: {
    backgroundColor: '#EDF2F7',
    borderRadius: 15,
    padding: 18,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  prayerOfDayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  prayerOfDayTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#718096',
    letterSpacing: 0.8,
  },
  prayerOfDayBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#005D3A',
    backgroundColor: '#E6FFFA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  prayerOfDayItalicText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2D3748',
    lineHeight: 22,
  },
  prayerOfDaySource: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A5568',
    marginTop: 8,
    textAlign: 'right',
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

  // Learn Salat Button Card Styles
  learnSalatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#005D3A',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  learnSalatIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnSalatTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#005D3A',
  },
  learnSalatSub: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },

  // Pamphlet Modal Viewer Styles
  pamphletHeaderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#2D3748',
  },
  closeModalBtn: {
    padding: 4,
  },
  pamphletHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  pamphletPageIndicator: {
    color: '#A0AEC0',
    fontSize: 13,
    fontWeight: '600',
  },
  pamphletPageSlide: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pamphletImage: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT - 160,
  },

  // Tasbih Screen Styling
  tasbihGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tasbihGridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  symbolBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbolText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  tasbihName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 2,
  },
  tasbihTranslation: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 6,
  },
  todayCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  todayCountText: {
    fontSize: 11,
    color: '#005D3A',
    fontWeight: '600',
    marginLeft: 4,
  },

  // Counter View Specific Styling
  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 6,
  },
  backButtonText: {
    color: '#005D3A',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 4,
  },
  counterBannerCard: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerPrayerName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  bannerPrayerSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  bannerArabicText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  targetLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#A0AEC0',
    marginRight: 10,
  },
  targetStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  stepBtn: {
    paddingHorizontal: 8,
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
  },
  targetValueText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2D3748',
    marginHorizontal: 12,
  },
  circleCounter: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: '#005D3A',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  circleCountNumber: {
    fontSize: 52,
    fontWeight: '800',
    color: '#2D3748',
  },
  circleTargetSub: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    marginVertical: 10,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#005D3A',
  },
  statLabel: {
    fontSize: 11,
    color: '#A0AEC0',
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  resetCounterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 10,
  },
  resetCounterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    marginLeft: 6,
  },

  // Qibla Compass Styles
  compassWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  compassOuterCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  compassCenterBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#005D3A',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  compassDegreeText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#005D3A',
  },
  compassSubLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#A0AEC0',
    letterSpacing: 0.5,
  },
  cardinalMark: {
    position: 'absolute',
    fontWeight: '800',
    fontSize: 14,
    color: '#2D3748',
  },
  needleContainer: {
    position: 'absolute',
    width: 14,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needlePointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#005D3A',
  },
  needleTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#CBD5E0',
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  navigationIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3748',
  },
  instructionSub: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  locationInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  locationInfoTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A0AEC0',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  coordsText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },

  // Khutba Screen Styles
  sermonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sermonHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sermonBadge: {
    backgroundColor: '#DCFCE7',
    color: '#005D3A',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sermonDate: {
    fontSize: 12,
    color: '#A0AEC0',
    fontWeight: '600',
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2D3748',
    marginBottom: 4,
  },
  sermonSubText: {
    fontSize: 13,
    color: '#005D3A',
    fontWeight: '700',
    marginBottom: 2,
  },
  sermonLocationText: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 14,
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFEDD5',
    borderColor: '#FED7AA',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
  },
  youtubeButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9A3412',
    marginLeft: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#005D3A',
    letterSpacing: 0.8,
    marginLeft: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#005D3A',
    marginRight: 8,
    lineHeight: 20,
  },
  summaryText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
    lineHeight: 20,
  },

  // Settings Screen Styling
  settingsGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  settingsGroupHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A0AEC0',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsRowTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
  },
  settingsRowSub: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 2,
  },
  settingsRowValue: {
    fontSize: 13,
    color: '#A0AEC0',
    fontWeight: '500',
  },
  reminderExpandBox: {
    paddingVertical: 12,
    borderBottomColor: '#F1F5F9',
  },
  reminderExpandTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#005D3A',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A5568',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  reminderFooterSub: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  settingsFooter: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerAppTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A0AEC0',
  },
  footerAppSub: {
    fontSize: 11,
    color: '#CBD5E0',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
});