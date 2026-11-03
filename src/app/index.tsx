import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';

// Standardized Design Tokens
const COLORS = {
  background: '#f8fafc',      // Slate 50
  surface: '#ffffff',         // Card & Tab White
  primaryDark: '#0f172a',     // Slate 900
  textMain: '#1e293b',        // Slate 800
  textMuted: '#64748b',       // Slate 500
  accentBlue: '#2563eb',      // Royal Blue 600
  accentBlueBg: '#eff6ff',    // Royal Blue 50
  borderLight: '#e2e8f0',     // Slate 200
  borderDark: '#cbd5e1',      // Slate 300
  noticeBg: '#f0f9ff',        // Sky 50
  noticeBorder: '#0284c7',    // Sky 600
  noticeText: '#0c4a6e',      // Sky 900
  danger: '#ef4444',          // Red 500
};

const CATEGORIES = ['All', 'Clinical Care', 'Emergency', 'Pediatrics', 'Surgical Tech'];

const PROCEDURES = [
  {
    id: '1',
    title: 'Peripheral IV Insertion',
    discipline: 'nursing',
    category: 'Clinical Care',
    duration: '12 mins',
    stepsCount: 6,
    africanNote: 'Requires manual gravity drip rate calculation and tourniquet substitute check.',
    europeanNote: 'Standard infusion pump setup with metric gauge monitoring.',
    steps: [
      'Perform hand hygiene and apply non-sterile gloves.',
      'Identify patient using two identifiers.',
      'Apply tourniquet 10–15 cm above insertion site.',
      'Clean skin site with chlorhexidine/alcohol for 30 seconds.',
      'Insert cannula at 15–30 degree angle until blood flashback occurs.',
      'Secure catheter with transparent dressing and label date/time.',
    ],
  },
  {
    id: '2',
    title: 'Sterile Field & Scrub Technique',
    discipline: 'surgical',
    category: 'Surgical Tech',
    duration: '18 mins',
    stepsCount: 5,
    africanNote: 'Emphasizes surgical water conservation protocols during timed hand scrub.',
    europeanNote: 'Standard automated sensor basin scrub routine.',
    steps: [
      'Remove all jewelry and inspect hands/nails.',
      'Perform initial pre-wash with soap and water.',
      'Clean subungual area under nails using sterile pick.',
      'Scrub hands and forearms up to 2 inches above elbow for 3–5 minutes.',
      'Keep hands elevated above elbows while entering operating room.',
    ],
  },
  {
    id: '3',
    title: 'Trauma Airway Management',
    discipline: 'nursing',
    category: 'Emergency',
    duration: '15 mins',
    stepsCount: 4,
    africanNote: 'Focuses on manual jaw-thrust maneuver when suction units are limited.',
    europeanNote: 'Uses inline suction catheter with pulse oximetry monitoring.',
    steps: [
      'Assess airway patency and cervical spine risk.',
      'Perform jaw-thrust maneuver without head extension.',
      'Clear oral cavity using rigid suction tip if available.',
      'Insert Oropharyngeal Airway (OPA) if patient is unresponsive.',
    ],
  },
];

const REELS = [
  {
    id: 'r1',
    title: 'Quick 30s IV Trick for Tough Veins',
    author: 'Dr. K. Mensah',
    likes: '14.2k',
    comments: '342',
    narrator: 'Single Narrator • Clinical Tip',
  },
  {
    id: 'r2',
    title: 'Sterile Scrub Routine (African Context)',
    author: 'Nurse Sarah J.',
    likes: '8.9k',
    comments: '189',
    narrator: 'Single Narrator • Surgical Tech',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'reels' | 'saved' | 'profile'>('home');
  const [discipline, setDiscipline] = useState<'nursing' | 'surgical'>('nursing');
  const [region, setRegion] = useState<'African' | 'European'>('African');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProcedure, setSelectedProcedure] = useState<(typeof PROCEDURES)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProcedures = PROCEDURES.filter((item) => {
    const matchesDiscipline = item.discipline === discipline;
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesDiscipline && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Persistent App Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Diadikasia</Text>
        <TouchableOpacity
          style={styles.regionBadge}
          onPress={() => setRegion(region === 'African' ? 'European' : 'African')}
        >
          <Text style={styles.regionBadgeText}>
            {region === 'African' ? '🌍 African' : '🇪🇺 European'} Context
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Main Body */}
      <View style={styles.body}>
        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Core Discipline Switcher */}
            <View style={styles.disciplineContainer}>
              <TouchableOpacity
                style={[styles.disciplineTab, discipline === 'nursing' && styles.disciplineTabActive]}
                onPress={() => setDiscipline('nursing')}
              >
                <Text style={[styles.disciplineText, discipline === 'nursing' && styles.disciplineTextActive]}>
                  Nursing Procedures
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.disciplineTab, discipline === 'surgical' && styles.disciplineTabActive]}
                onPress={() => setDiscipline('surgical')}
              >
                <Text style={[styles.disciplineText, discipline === 'surgical' && styles.disciplineTextActive]}>
                  Surgical Demos
                </Text>
              </TouchableOpacity>
            </View>

            {/* Category Filter Chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, activeCategory === cat && styles.chipActive]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionHeader}>
              {discipline === 'nursing' ? 'Nursing Procedures' : 'Surgical Demonstrations'} ({filteredProcedures.length})
            </Text>

            {filteredProcedures.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card} onPress={() => setSelectedProcedure(item)}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                  <Text style={styles.cardDuration}>⏱ {item.duration}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardStepsCount}>📋 {item.stepsCount} Steps Checklist</Text>
                  <Text style={styles.cardAction}>Start Demo →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* 2. EXPLORE TAB */}
        {activeTab === 'explore' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeader}>Explore & Search</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search procedures, equipment, or topics..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Text style={styles.subSectionHeader}>Popular Clinical Searches</Text>
            <View style={styles.tagContainer}>
              {['Catheterization', 'IV Insertion', 'Wound Care', 'Vital Signs', 'Surgical Scrub'].map((tag) => (
                <TouchableOpacity key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>🔍 {tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {/* 3. REELS TAB */}
        {activeTab === 'reels' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeader}>Clinical Shorts & Reels</Text>
            {REELS.map((reel) => (
              <View key={reel.id} style={styles.reelCard}>
                <View style={styles.reelPlaceholder}>
                  <Text style={styles.playIcon}>▶</Text>
                  <Text style={styles.reelTitleText}>{reel.title}</Text>
                  <Text style={styles.reelAuthorText}>By {reel.author}</Text>
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{reel.narrator}</Text>
                  </View>
                </View>
                <View style={styles.reelOverlay}>
                  <Text style={styles.reelStatText}>❤️ {reel.likes}</Text>
                  <Text style={styles.reelStatText}>💬 {reel.comments}</Text>
                  <Text style={styles.reelStatText}>🔖 Save</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* 4. SAVED TAB */}
        {activeTab === 'saved' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionHeader}>Saved Collections</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📌 Peripheral IV Insertion</Text>
              <Text style={styles.cardDuration}>Bookmarked for offline review</Text>
            </View>
          </ScrollView>
        )}

        {/* 5. PROFILE TAB */}
        {activeTab === 'profile' && (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.profileHeaderCard}>
              <Text style={styles.greetingText}>Good Morning, Nurse Jane</Text>
              <Text style={styles.credentialsText}>Sarah Jenkins, RN, MSN • Verified Contributor</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>24.5</Text>
                <Text style={styles.statLabel}>Study Hours</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>Top 5%</Text>
                <Text style={styles.statLabel}>Rank</Text>
              </View>
            </View>

            <View style={styles.goalCard}>
              <Text style={styles.goalTitle}>Past 3 Days Goal</Text>
              <Text style={styles.goalProgress}>85% Complete</Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Procedure Detail Modal */}
      {selectedProcedure && (
        <Modal animationType="slide" transparent={false} visible={!!selectedProcedure}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedProcedure(null)}>
                <Text style={styles.closeButton}>✕ Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                {selectedProcedure.title}
              </Text>
            </View>

            <ScrollView contentContainerStyle={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.contextNotice}>
                <Text style={styles.contextNoticeTitle}>
                  {region === 'African' ? '🌍 African Teaching Context' : '🇪🇺 European Teaching Context'}
                </Text>
                <Text style={styles.contextNoticeText}>
                  {region === 'African' ? selectedProcedure.africanNote : selectedProcedure.europeanNote}
                </Text>
              </View>

              <Text style={styles.checklistTitle}>Step-by-Step Procedure</Text>
              {selectedProcedure.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}

      {/* Standardized 5-Tab Mobile Navigation Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('home')}>
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.tabIconActive]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('explore')}>
          <Text style={[styles.tabIcon, activeTab === 'explore' && styles.tabIconActive]}>📚</Text>
          <Text style={[styles.tabLabel, activeTab === 'explore' && styles.tabLabelActive]}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('reels')}>
          <Text style={[styles.tabIcon, activeTab === 'reels' && styles.tabIconActive]}>🎬</Text>
          <Text style={[styles.tabLabel, activeTab === 'reels' && styles.tabLabelActive]}>Reels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('saved')}>
          <Text style={[styles.tabIcon, activeTab === 'saved' && styles.tabIconActive]}>🔖</Text>
          <Text style={[styles.tabLabel, activeTab === 'saved' && styles.tabLabelActive]}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('profile')}>
          <Text style={[styles.tabIcon, activeTab === 'profile' && styles.tabIconActive]}>👤</Text>
          <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primaryDark,
    letterSpacing: -0.5,
  },
  regionBadge: {
    backgroundColor: COLORS.accentBlueBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  regionBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accentBlue,
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  disciplineContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.borderLight,
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  disciplineTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  disciplineTabActive: {
    backgroundColor: COLORS.surface,
  },
  disciplineText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  disciplineTextActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
  },
  chipActive: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: COLORS.surface,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textMain,
    marginBottom: 12,
  },
  subSectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accentBlue,
    textTransform: 'uppercase',
  },
  cardDuration: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStepsCount: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  cardAction: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.accentBlue,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderDark,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.textMain,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: COLORS.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textMain,
    fontWeight: '500',
  },
  reelCard: {
    height: 220,
    backgroundColor: COLORS.primaryDark,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  reelPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 32,
    color: COLORS.surface,
    marginBottom: 8,
  },
  reelTitleText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  reelAuthorText: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  badgeContainer: {
    backgroundColor: COLORS.accentBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    color: COLORS.surface,
    fontSize: 10,
    fontWeight: '700',
  },
  reelOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 8,
  },
  reelStatText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '600',
  },
  profileHeaderCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.surface,
    marginBottom: 4,
  },
  credentialsText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accentBlue,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  goalCard: {
    backgroundColor: COLORS.accentBlueBg,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
  },
  goalProgress: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d4ed8',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: COLORS.textMuted,
  },
  tabIconActive: {
    color: COLORS.accentBlue,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginTop: 2,
  },
  tabLabelActive: {
    color: COLORS.accentBlue,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  closeButton: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.danger,
    marginRight: 16,
  },
  modalHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
    flex: 1,
  },
  modalBody: {
    padding: 16,
  },
  contextNotice: {
    backgroundColor: COLORS.noticeBg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.noticeBorder,
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
  },
  contextNoticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0369a1',
    marginBottom: 4,
  },
  contextNoticeText: {
    fontSize: 12,
    color: COLORS.noticeText,
    lineHeight: 18,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: COLORS.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});