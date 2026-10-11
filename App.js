// App.js - Main entry point for the AMJ Saskatoon / Belize Community App

import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Create the Bottom Tab Navigator instance
const Tab = createBottomTabNavigator();

/* -------------------------------------------------------------------------- */
/*                              SHARED HEADER                                 */
/* -------------------------------------------------------------------------- */

// Reusable Top Header Component matching your app mockups
const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>AMJ SASKATOON</Text>
      {/* Placeholder for the top-right logo/avatar icon */}
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
  // Hardcoded prayer time data based on screen mockup layout
  const prayerTimes = [
    { name: 'Fajr', time: '6:20 AM', isNext: false },
    { name: 'Zuhr', time: '1:30 PM', isNext: true },
    { name: 'Asr', time: '5:00 PM', isNext: false },
    { name: 'Maghrib', time: '6:30 PM', isNext: false },
    { name: 'Isha', time: '8:00 PM', isNext: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Top Green Card for Location and Date Selection */}
        <View style={styles.greenBannerCard}>
          <Text style={styles.bannerSubLabel}>PRAYER TIMES</Text>
          <Text style={styles.bannerMainTitle}>Saskatoon</Text>
          <View style={styles.divider} />
          <View style={styles.dateSelectorRow}>
            <Text style={styles.arrowText}>‹</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.todaySubText}>TODAY</Text>
              <Text style={styles.dateText}>Sunday, October 11</Text>
            </View>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </View>

        {/* List of Prayer Time Cards */}
        {prayerTimes.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.prayerRowCard, 
              item.isNext && styles.nextPrayerHighlight // Apply green border if it's the next prayer
            ]}
          >
            <View style={styles.prayerNameContainer}>
              {item.isNext && <View style={styles.greenDot} />}
              <Text style={[styles.prayerNameText, item.isNext && styles.nextPrayerText]}>
                {item.name}
              </Text>
              {item.isNext && (
                <View style={styles.nextBadge}>
                  <Text style={styles.nextBadgeText}>NEXT</Text>
                </View>
              )}
            </View>
            <Text style={[styles.prayerTimeText, item.isNext && styles.nextPrayerText]}>
              {item.time}
            </Text>
          </View>
        ))}

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