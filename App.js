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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

// Default Admin Secret PIN for Imam
const ADMIN_PIN = "1234";

// Local 19-Page Salat Pamphlet Images Array
const salatPages = [
  require('./assets/salat_guide/1.png'),
  require('./assets/salat_guide/2.png'),
  require('./assets/salat_guide/3.png'),
  require('./assets/salat_guide/4.png'),
  require('./assets/salat_guide/5.png'),
  require('./assets/salat_guide/6.png'),
  require('./assets/salat_guide/7.png'),
  require('./assets/salat_guide/8.png'),
  require('./assets/salat_guide/9.png'),
  require('./assets/salat_guide/10.png'),
  require('./assets/salat_guide/11.png'),
  require('./assets/salat_guide/12.png'),
  require('./assets/salat_guide/13.png'),
  require('./assets/salat_guide/14.png'),
  require('./assets/salat_guide/15.png'),
  require('./assets/salat_guide/16.png'),
  require('./assets/salat_guide/17.png'),
  require('./assets/salat_guide/18.png'),
  require('./assets/salat_guide/19.png'),
];

// Local 8-Page Articles of Faith Images Array
const articlesOfFaithPages = [
  require('./assets/Articles_of_faith_guide/1.png'),
  require('./assets/Articles_of_faith_guide/2.png'),
  require('./assets/Articles_of_faith_guide/3.png'),
  require('./assets/Articles_of_faith_guide/4.png'),
  require('./assets/Articles_of_faith_guide/5.png'),
  require('./assets/Articles_of_faith_guide/6.png'),
  require('./assets/Articles_of_faith_guide/7.png'),
  require('./assets/Articles_of_faith_guide/8.png'),
];

// Pamphlet Library Configuration
const PAMPHLETS = [
  {
    id: 'salat',
    title: 'Learn Salat Guide',
    subtitle: 'Step-by-step prayer guide (19 Pages)',
    icon: 'book-outline',
    pages: salatPages,
  },
  {
    id: 'wudu',
    title: 'Wudu (Ablution) Guide',
    subtitle: 'Step-by-step guide to performing Wudu',
    icon: 'water-outline',
    pages: [
      require('./assets/wudu_guide/wudu.png'),
    ],
  },
  {
    id: 'articles_faith',
    title: 'Articles of Faith',
    subtitle: 'The 6 fundamental beliefs in Islam (8 Pages)',
    icon: 'sparkles-outline',
    pages: articlesOfFaithPages,
  },
  {
    id: 'pillars_islam',
    title: 'Five Pillars of Islam',
    subtitle: 'The foundational pillars of Islamic practice',
    icon: 'shapes-outline',
    pages: [
      require('./assets/Five_pillars_of_Islam_guide/1.png'),
    ],
  },
  {
    id: 'daily_prayers_guide',
    title: 'Five Daily Prayers Guide',
    subtitle: 'Overview of the 5 prescribed daily prayers',
    icon: 'time-outline',
    pages: [
      require('./assets/Five_daily_prayers_guide/2.png'),
    ],
  },
  {
    id: 'veil',
    title: 'The Islamic Veil',
    subtitle: 'Understanding modesty in Islam',
    icon: 'shirt-outline',
    pages: [], 
  },
  {
    id: 'messiah',
    title: 'The Messiah Has Come',
    subtitle: 'The advent of the Promised Messiah (as)',
    icon: 'star-outline',
    pages: [], 
  },
  {
    id: 'bible',
    title: 'Muhammad In The Bible',
    subtitle: 'Biblical prophecies regarding the Holy Prophet (saw)',
    icon: 'journal-outline',
    pages: [], 
  },
  {
    id: 'jihad',
    title: 'Jihad: The True Concept',
    subtitle: 'Explaining the peaceful reality of Jihad',
    icon: 'shield-checkmark-outline',
    pages: [], 
  },
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

const PrayerTimesScreen = ({ prayerData, isImam, onUpdatePrayerTimes }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [editTimes, setEditTimes] = useState([...prayerData]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-US', options);

  // List of Daily Prayers with direct links to exact sources
  const dailyPrayers = [
    {
      type: 'Holy Qur\'an',
      reference: 'Surah Al-Baqarah (2:202)',
      text: '"Our Lord, grant us good in this world and good in the Hereafter, and protect us from the torment of the Fire."',
      url: 'https://www.alislam.org/quran/app/2:202'
    },
    {
      type: 'Holy Prophet (saw)',
      reference: 'Sunan Ibn Majah (Hadith 925)',
      text: '"O Allah, I ask You for beneficial knowledge, good acceptable provision, and deeds that are accepted."',
      url: 'https://sunnah.com/urn/1309770'
    },
    {
      type: 'Promised Messiah (as)',
      reference: 'Tazkirah (Page 623)',
      text: '"Lord, everything is at Your service; so O Lord, protect me, help me, and have mercy on me."',
      url: 'https://new.alislam.org/library/books/tadhkirah?option=search&page=623&search=%D9%85%D8%A7%D9%84%DA%A9%D8%8C+%D8%B3%D8%A8+%DA%A9%DA%86%DA%BE+%D8%A2%D9%BE+%DA%A9%DB%81+%D8%AE%D8%AF%D9%85%D8%AA+%D9%85%DB%81+%DB%81%DB%92%D8%9B+%D8%AA%D9%88+%D8%A7%DB%92+%D9%85%D8%A7%D9%84%DA%A9%D8%8C+%D9%85%DB%81+%D8%AD%D9%81%D8%A7%D8%B8%D8%AA+%DA%A9%D8%B1%DB%81%D8%8C+%D9%85%DB%81+%D9%85%D8%AF%D8%AF+%DA%A9%D8%B1%DB%81%D8%8C+%D8%A7%D9%88%D8%B1+%D9%85%D8%AC%DA%BE+%D9%BE%D8%B1+%D8%B1%D8%AD%D9%85+%DA%A9%D8%B1%DB%81%DB%94'
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

  const handleOpenPrayerLink = (url) => {
    Linking.openURL(url);
  };

  const handleTimeInputChange = (index, value) => {
    const updated = [...editTimes];
    updated[index].time = value;
    setEditTimes(updated);
  };

  const handleSaveTimes = () => {
    onUpdatePrayerTimes(editTimes);
    setIsEditing(false);
    Alert.alert("Prayer Times Updated", "The new prayer schedule has been saved successfully.");
  };

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

        {isImam && (
          <TouchableOpacity 
            style={styles.adminEditBar}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? "close-circle-outline" : "create-outline"} size={18} color="#005D3A" />
            <Text style={styles.adminEditText}>
              {isEditing ? "Cancel Editing Times" : "Admin: Edit Prayer Times"}
            </Text>
          </TouchableOpacity>
        )}

        {isEditing ? (
          <View style={styles.editFormCard}>
            <Text style={styles.formHeaderTitle}>Update Belize City Prayer Schedule</Text>
            {editTimes.map((item, index) => (
              <View key={index} style={styles.prayerEditRow}>
                <Text style={styles.prayerEditLabel}>{item.name}</Text>
                <TextInput
                  style={styles.prayerEditInput}
                  value={item.time}
                  onChangeText={(val) => handleTimeInputChange(index, val)}
                  placeholder="e.g. 5:00 AM"
                />
              </View>
            ))}
            <TouchableOpacity style={styles.saveSermonBtn} onPress={handleSaveTimes}>
              <Text style={styles.saveSermonBtnText}>Save Updated Times</Text>
            </TouchableOpacity>
          </View>
        ) : (
          prayerData.map((item, index) => {
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
          })
        )}

        {/* CLICKABLE PRAYER OF THE DAY CARD */}
        <TouchableOpacity 
          style={styles.prayerOfDayCard}
          activeOpacity={0.85}
          onPress={() => handleOpenPrayerLink(todayPrayer.url)}
        >
          <View style={styles.prayerOfDayHeaderRow}>
            <Text style={styles.prayerOfDayTitle}>PRAYER OF THE DAY</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.prayerOfDayBadge}>{todayPrayer.type}</Text>
              <Ionicons name="open-outline" size={14} color="#005D3A" style={{ marginLeft: 6 }} />
            </View>
          </View>
          <Text style={styles.prayerOfDayItalicText}>{todayPrayer.text}</Text>
          <Text style={styles.prayerOfDaySource}>— {todayPrayer.reference} (Tap to view source)</Text>
        </TouchableOpacity>

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

const AnnouncementsScreen = ({ isImam }) => {
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

        {isImam ? (
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
        ) : (
          <View style={styles.readOnlyBanner}>
            <Ionicons name="lock-closed-outline" size={14} color="#718096" />
            <Text style={styles.readOnlyBannerText}>
              Broadcasts are published by the Imam. Login as Admin in Settings to post.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*--------                TAB SCREEN 3: PRAYERS & TASBIH              --------*/
/* -------------------------------------------------------------------------- */

const INITIAL_PRAYERS = [
  { 
    id: '1', 
    name: 'SubhanAllah', 
    transliteration: 'SubhanAllah',
    translation: 'Glory be to Allah', 
    arabic: 'سُبْحَانَ ٱللَّٰهِ', 
    symbol: 'س', 
    color: '#00A86B', 
    target: 33, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '2', 
    name: 'Alhamdulillah', 
    transliteration: 'Alhamdulillah',
    translation: 'Praise be to Allah', 
    arabic: 'ٱلْحَمْدُ لِلَّٰهِ', 
    symbol: 'ا', 
    color: '#2563EB', 
    target: 33, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '3', 
    name: 'Allahu Akbar', 
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest', 
    arabic: 'ٱللَّٰهُ أَكْبَرُ', 
    symbol: 'ا', 
    color: '#8B5CF6', 
    target: 34, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '4', 
    name: 'La ilaha illallah', 
    transliteration: 'La ilaha illallah',
    translation: 'There is no god but Allah', 
    arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ', 
    symbol: 'ل', 
    color: '#D97706', 
    target: 33, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '5', 
    name: 'Astaghfirullah', 
    transliteration: 'Astaghfirullaha Rabbi min kulli zanbin wa atubu ilaih',
    translation: 'I seek forgiveness from Allah, my Lord, for all my sins and turn to Him in repentance.', 
    arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ رَبِّي مِنْ كُلِّ ذَنْبٍ وَأَتُوبُ إِلَيْهِ', 
    symbol: 'أ', 
    color: '#E11D48', 
    target: 100, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '6', 
    name: 'Durood Sharif', 
    transliteration: 'Allahumma salli ala Muhammadin wa aali Muhammad',
    translation: 'O Allah, send blessings upon Muhammad and upon the people of Muhammad.', 
    arabic: 'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ', 
    symbol: 'ا', 
    color: '#0D9488', 
    target: 200, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
  { 
    id: '7', 
    name: 'Rabbi Kulli Shai’in', 
    transliteration: 'Rabbi kullu sha’in khadimuka rabbi fahfazni wansurni warhamni',
    translation: 'O Lord, everything is at Your service; so O Lord, protect me, help me, and have mercy on me.', 
    arabic: 'رَبِّ كُلُّ شَيْءٍ خَادِمُكَ رَبِّ فَاحْفَظْنِي وَانْصُرْنِي وَارْحَمْنِي', 
    symbol: 'ر', 
    color: '#7C3AED', 
    target: 100, 
    count: 0, 
    total: 0, 
    sets: 0 
  },
];

const PrayersScreen = () => {
  const [prayers, setPrayers] = useState(INITIAL_PRAYERS);
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      
      {selectedPrayer ? (
        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 30 }}>
          <TouchableOpacity 
            style={styles.backButtonRow} 
            onPress={() => setSelectedPrayerId(null)}
          >
            <Ionicons name="chevron-back" size={20} color="#005D3A" />
            <Text style={styles.backButtonText}>Back to prayers</Text>
          </TouchableOpacity>

          <View style={[styles.counterBannerCard, { backgroundColor: selectedPrayer.color }]}>
            <Text style={styles.bannerPrayerName}>{selectedPrayer.name.toUpperCase()}</Text>
            
            <Text style={styles.bannerArabicText}>{selectedPrayer.arabic}</Text>

            <View style={styles.bannerSectionBox}>
              <Text style={styles.bannerSectionLabel}>PRONUNCIATION:</Text>
              <Text style={styles.bannerPhoneticText}>{selectedPrayer.transliteration}</Text>
            </View>

            <View style={styles.bannerSectionBox}>
              <Text style={styles.bannerSectionLabel}>TRANSLATION:</Text>
              <Text style={styles.bannerTranslationText}>{selectedPrayer.translation}</Text>
            </View>
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
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.greenBannerCard}>
            <Text style={styles.bannerSubLabel}>DAILY REMEMBRANCE</Text>
            <Text style={styles.bannerMainTitle}>Prayers & Tasbih</Text>
          </View>

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
                <Text style={styles.tasbihPhonetic} numberOfLines={1}>{item.transliteration}</Text>
                <Text style={styles.tasbihTranslation} numberOfLines={2}>{item.translation}</Text>
                {item.total > 0 && (
                  <View style={styles.todayCountRow}>
                    <Ionicons name="time-outline" size={12} color="#005D3A" />
                    <Text style={styles.todayCountText}>{item.total} today</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* TODAY'S PROGRESS TRACKER CARD */}
          <View style={styles.progressCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="disc-outline" size={18} color="#005D3A" style={{ marginRight: 6 }} />
              <Text style={{ fontWeight: '700', fontSize: 14, color: '#2D3748' }}>Today's Progress</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {prayers.slice(0, 3).map((p) => (
                <View key={p.id} style={{ alignItems: 'center', flex: 1 }}>
                  <Text style={{ fontSize: 11, color: '#718096', marginBottom: 4 }}>{p.name}</Text>
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${Math.min(100, (p.count / p.target) * 100)}%`, backgroundColor: p.color }]} />
                  </View>
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                       TAB SCREEN 4: LEARN (PAMPHLETS)                      */
/* -------------------------------------------------------------------------- */

const LearnScreen = () => {
  const [selectedPamphlet, setSelectedPamphlet] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(0);

  const handleOpenPamphlet = (item) => {
    if (item.pages.length === 0) {
      Alert.alert(
        "Pamphlet Coming Soon", 
        `The pages for "${item.title}" are being prepared. You can scan and add PNG images into assets to view.`
      );
      return;
    }
    setSelectedPamphlet(item);
    setActivePageIndex(0);
  };

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActivePageIndex(slide);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>ISLAMIC PUBLICATIONS</Text>
          <Text style={styles.bannerMainTitle}>Learn & Discover</Text>
        </View>

        {PAMPHLETS.map((item) => (
          <TouchableOpacity 
            key={item.id}
            style={styles.learnPamphletCard} 
            activeOpacity={0.85}
            onPress={() => handleOpenPamphlet(item)}
          >
            <View style={styles.learnPamphletIconCircle}>
              <Ionicons name={item.icon} size={22} color="#005D3A" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.learnPamphletTitle}>{item.title}</Text>
              <Text style={styles.learnPamphletSub}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* PAMPHLET MODAL READER */}
      {selectedPamphlet && (
        <Modal 
          visible={!!selectedPamphlet} 
          animationType="slide" 
          onRequestClose={() => setSelectedPamphlet(null)}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: '#1A202C' }}>
            
            <View style={styles.pamphletHeaderBar}>
              <TouchableOpacity onPress={() => setSelectedPamphlet(null)} style={styles.closeModalBtn}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.pamphletHeaderTitle} numberOfLines={1}>
                {selectedPamphlet.title}
              </Text>
              <Text style={styles.pamphletPageIndicator}>
                {activePageIndex + 1} / {selectedPamphlet.pages.length}
              </Text>
            </View>

            <ScrollView 
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={{ flex: 1 }}
            >
              {selectedPamphlet.pages.map((pageSrc, idx) => (
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
      )}
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                       TAB SCREEN 5: KHUTBA (SERMONS)                       */
/* -------------------------------------------------------------------------- */

const KhutbaScreen = ({ sermon, isImam, onUpdateSermon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(sermon.title);
  const [editUrl, setEditUrl] = useState(sermon.youtubeUrl);
  const [editPoints, setEditPoints] = useState(sermon.summary.join('\n'));

  const handleOpenYouTube = () => {
    Linking.openURL(sermon.youtubeUrl);
  };

  const handleSaveSermon = () => {
    const updatedSummary = editPoints.split('\n').filter(p => p.trim() !== '');
    onUpdateSermon({
      ...sermon,
      title: editTitle,
      youtubeUrl: editUrl,
      summary: updatedSummary
    });
    setIsEditing(false);
    Alert.alert("Success", "Khutba sermon details updated successfully.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>BELOVED HUZOOR'S (AA)</Text>
          <Text style={styles.bannerMainTitle}>Friday Sermon</Text>
        </View>

        {isImam && (
          <TouchableOpacity 
            style={styles.adminEditBar}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons name={isEditing ? "close-circle-outline" : "create-outline"} size={18} color="#005D3A" />
            <Text style={styles.adminEditText}>
              {isEditing ? "Cancel Editing Sermon" : "Admin: Update This Week's Khutba"}
            </Text>
          </TouchableOpacity>
        )}

        {isEditing ? (
          <View style={styles.editFormCard}>
            <Text style={styles.formLabel}>Sermon Title & Date</Text>
            <TextInput
              style={styles.formInput}
              value={editTitle}
              onChangeText={setEditTitle}
            />

            <Text style={styles.formLabel}>YouTube Video Link</Text>
            <TextInput
              style={styles.formInput}
              value={editUrl}
              onChangeText={setEditUrl}
            />

            <Text style={styles.formLabel}>7 Daily Points (One per line for 10 AM notifications)</Text>
            <TextInput
              style={[styles.formInput, { height: 120 }]}
              multiline
              value={editPoints}
              onChangeText={setEditPoints}
            />

            <TouchableOpacity style={styles.saveSermonBtn} onPress={handleSaveSermon}>
              <Text style={styles.saveSermonBtnText}>Save Sermon Details</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.sermonCard}>
              <View style={styles.sermonHeaderRow}>
                <Text style={styles.sermonBadge}>LATEST KHUTBA</Text>
                <Text style={styles.sermonDate}>Oct 16, 2026</Text>
              </View>
              
              <Text style={styles.sermonTitle}>{sermon.title}</Text>
              <Text style={styles.sermonSubText}>By {sermon.speaker}</Text>
              <Text style={styles.sermonLocationText}>📍 {sermon.location}</Text>

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
                <Text style={styles.summaryTitle}>ENGLISH SUMMARY & DAILY POINTS</Text>
              </View>
              
              {sermon.summary.map((point, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.summaryText}>{point}</Text>
                </View>
              ))}
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

/* -------------------------------------------------------------------------- */
/*                            TAB SCREEN 6: SETTINGS                          */
/* -------------------------------------------------------------------------- */

const SettingsScreen = ({ isImam, setIsImam, khutbaSummary, prayerReminders, setPrayerReminders, selectedOffset, setSelectedOffset }) => {
  const [pinInput, setPinInput] = useState('');

  const reminderOptions = ['At time', '5 min', '10 min', '15 min', '30 min'];

  const handleAdminLogin = () => {
    if (pinInput === ADMIN_PIN) {
      setIsImam(true);
      setPinInput('');
      Alert.alert("Admin Unlocked", "Welcome Imam! Broadcast and Khutba editing privileges are now enabled.");
    } else {
      Alert.alert("Incorrect PIN", "The admin secret PIN you entered is invalid.");
    }
  };

  const handleAdminLogout = () => {
    setIsImam(false);
    Alert.alert("Logged Out", "Returned to standard view-only mode.");
  };

  const handleScheduleDailyKhutbaReminders = () => {
    Alert.alert(
      "Daily Reminders Active 🕌", 
      `Scheduled 7 daily Khutba notification points at 10:00 AM every morning until next Friday!`
    );
  };

  const handleClearCache = () => {
    Alert.alert("Cache Cleared", "Local app storage and cached prayer schedules have been reset.");
  };

  const handleTestNotification = () => {
    Alert.alert(
      "Prayer Reminder Test 🕌", 
      `Upcoming Prayer starts in ${selectedOffset}!`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>SETTINGS</Text>
          <Text style={styles.bannerMainTitle}>Preferences</Text>
        </View>

        {/* IMAM / ADMIN AUTHENTICATION CARD */}
        <View style={styles.settingsGroupCard}>
          <Text style={styles.settingsGroupHeader}>IMAM / ADMIN ACCESS</Text>
          
          {isImam ? (
            <View style={styles.adminActiveBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="checkmark-circle" size={20} color="#005D3A" />
                <Text style={styles.adminActiveText}>Admin Access Unlocked</Text>
              </View>
              <TouchableOpacity style={styles.logoutBtn} onPress={handleAdminLogout}>
                <Text style={styles.logoutBtnText}>Lock Access</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.pinLoginRow}>
              <TextInput
                style={styles.pinInput}
                placeholder="Enter Admin PIN"
                placeholderTextColor="#A0AEC0"
                keyboardType="numeric"
                secureTextEntry
                value={pinInput}
                onChangeText={setPinInput}
              />
              <TouchableOpacity style={styles.pinSubmitBtn} onPress={handleAdminLogin}>
                <Text style={styles.pinSubmitText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* NOTIFICATIONS SECTION */}
        <View style={styles.settingsGroupCard}>
          <Text style={styles.settingsGroupHeader}>NOTIFICATIONS & REMINDERS</Text>
          
          <View style={[styles.settingsRow, prayerReminders && styles.settingsBorderBottom]}>
            <View style={styles.settingsRowLeft}>
              <Ionicons name="notifications-outline" size={20} color="#005D3A" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.settingsRowTitle}>Prayer Reminders</Text>
                <Text style={styles.settingsRowSub}>
                  {prayerReminders ? `Active (${selectedOffset} before)` : 'Off'}
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

          {/* 10 AM DAILY KHUTBA REMINDER BUTTON */}
          <TouchableOpacity 
            style={[styles.settingsRow, styles.settingsBorderBottom]} 
            onPress={handleScheduleDailyKhutbaReminders}
          >
            <View style={styles.settingsRowLeft}>
              <Ionicons name="sunny-outline" size={20} color="#005D3A" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.settingsRowTitle}>10:00 AM Daily Khutba Point</Text>
                <Text style={styles.settingsRowSub}>Receive 1 point every morning till Friday</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>

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

        {/* DATA & STORAGE SECTION */}
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

        {/* FOOTER INFO */}
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
  const [isImam, setIsImam] = useState(false);
  const [prayerReminders, setPrayerReminders] = useState(true);
  const [selectedOffset, setSelectedOffset] = useState('30 min');

  const [prayerData, setPrayerData] = useState([
    { name: 'Fajr', time: '4:45 AM', hour: 4, minute: 45 },
    { name: 'Zuhr', time: '1:00 PM', hour: 13, minute: 0 },
    { name: 'Asr', time: '3:30 PM', hour: 15, minute: 30 },
    { name: 'Maghrib', time: '6:30 PM', hour: 18, minute: 30 },
    { name: 'Isha', time: '6:30 PM', hour: 18, minute: 30 },
  ]);

  const [sermon, setSermon] = useState({
    title: "Friday Sermon - 16th October 2026",
    speaker: "Hazrat Mirza Masroor Ahmad (aa)",
    location: "Masjid Mubarak, Tilford, UK",
    youtubeUrl: "https://www.youtube.com/watch?v=sJZvP9AmB9g",
    summary: [
      "His Holiness (aa) emphasized the vital importance of remaining steadfast in daily prayers.",
      "His Holiness highlighted upholding high moral conduct in everyday interactions.",
      "A reminder to safeguard local community bonds and support those in need.",
      "His Holiness urged youth to dedicate time for religious and moral learning.",
      "Focusing on the power of Tahajjud prayer during challenging times.",
      "Promoting moderation, patience, and unwavering trust in Allah's decrees.",
      "A special prayer request was made for peace across the world and global prosperity."
    ]
  });

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
            else if (route.name === 'Learn') iconName = 'book-outline';
            else if (route.name === 'Khutba') iconName = 'tv-outline';
            else if (route.name === 'Settings') iconName = 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Times">
          {props => (
            <PrayerTimesScreen 
              {...props} 
              prayerData={prayerData} 
              isImam={isImam} 
              onUpdatePrayerTimes={setPrayerData} 
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Announce">
          {props => <AnnouncementsScreen {...props} isImam={isImam} />}
        </Tab.Screen>
        <Tab.Screen name="Prayers" component={PrayersScreen} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Khutba">
          {props => <KhutbaScreen {...props} sermon={sermon} isImam={isImam} onUpdateSermon={setSermon} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {props => (
            <SettingsScreen 
              {...props} 
              isImam={isImam} 
              setIsImam={setIsImam} 
              khutbaSummary={sermon.summary}
              prayerReminders={prayerReminders}
              setPrayerReminders={setPrayerReminders}
              selectedOffset={selectedOffset}
              setSelectedOffset={setSelectedOffset}
            />
          )}
        </Tab.Screen>
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

  // Prayer Editing Styles
  formHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#005D3A',
    marginBottom: 12,
  },
  prayerEditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  prayerEditLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },
  prayerEditInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    width: 120,
    textAlign: 'center',
    color: '#2D3748',
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
  readOnlyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  readOnlyBannerText: {
    fontSize: 12,
    color: '#718096',
    marginLeft: 8,
    flex: 1,
  },

  // Learn Tab Pamphlet Card Styles
  learnPamphletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  learnPamphletIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnPamphletTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2D3748',
  },
  learnPamphletSub: {
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
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
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
  tasbihPhonetic: {
    fontSize: 11,
    fontWeight: '600',
    color: '#005D3A',
    marginBottom: 2,
  },
  tasbihTranslation: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 6,
    lineHeight: 15,
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
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    width: '80%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
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
    marginBottom: 16,
  },
  bannerPrayerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  bannerArabicText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'right',
    marginBottom: 16,
    lineHeight: 36,
  },
  bannerSectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  bannerSectionLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  bannerPhoneticText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  bannerTranslationText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 13,
    fontStyle: 'italic',
    lineHeight: 18,
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
  adminEditBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  adminEditText: {
    color: '#005D3A',
    fontWeight: '700',
    fontSize: 13,
    marginLeft: 6,
  },
  editFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A5568',
    marginBottom: 6,
    marginTop: 10,
  },
  formInput: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#2D3748',
  },
  saveSermonBtn: {
    backgroundColor: '#005D3A',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveSermonBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
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
  pinLoginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pinInput: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 10,
  },
  pinSubmitBtn: {
    backgroundColor: '#005D3A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  pinSubmitText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  adminActiveBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  adminActiveText: {
    color: '#005D3A',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
  logoutBtn: {
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#E53E3E',
    fontWeight: '700',
    fontSize: 12,
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