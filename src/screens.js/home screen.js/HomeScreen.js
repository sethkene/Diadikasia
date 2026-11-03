import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { procedures } from '../data/procedures';
import { colors, font, radius, spacing } from '../theme';

// ---- Options shown on screen (same as the HTML prototype) ----
const DISCIPLINES = [
  { key: 'nursing', label: 'Nursing', icon: 'medkit-outline' },
  { key: 'surgical', label: 'Surgical', icon: 'cut-outline' },
  { key: 'all', label: 'All', icon: null },
];
const REGIONS = [
  { key: 'african', label: 'African', flag: '🌍' },
  { key: 'european', label: 'European', flag: '🇪🇺' },
];
const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'clinical', label: 'Clinical Care' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'pediatric', label: 'Pediatrics' },
  { key: 'surgical', label: 'Surgical Tech' },
];
// Sample "continue learning" progress. Later this comes from the user's saved progress.
const CONTINUE = [
  { id: 'proc-1', done: 2, tone: 'teal' },
  { id: 'proc-2', done: 1, tone: 'amber' },
];

const comingSoon = (what) => Alert.alert(what, 'This opens in a later step.');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [discipline, setDiscipline] = useState('nursing');
  const [region, setRegion] = useState('african');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(
    () =>
      procedures.filter(
        (p) =>
          (discipline === 'all' || p.discipline === discipline) &&
          (category === 'all' || p.category === category)
      ),
    [discipline, category]
  );
  const regionInfo = REGIONS.find((r) => r.key === region);

  return (
    <View style={s.screen}>
      <StatusBar style="light" />

      {/* ---------- HEADER ---------- */}
      <View style={[s.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={s.rowBetween}>
          <View style={s.rowCenter}>
            <View style={s.logo}>
              <Ionicons name="shield-checkmark" size={20} color={colors.white} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={s.brand}>Diadikasia</Text>
              <Text style={s.brandSub}>CLINICAL PROCEDURES</Text>
            </View>
          </View>
          <View style={s.rowCenter}>
            <Pressable style={s.contribute} onPress={() => comingSoon('Contribute')}>
              <Ionicons name="add-circle-outline" size={16} color={colors.teal[300]} />
              <Text style={s.contributeText}>Contribute</Text>
            </Pressable>
            <Pressable style={s.bell} onPress={() => comingSoon('Notifications')}>
              <Ionicons name="notifications-outline" size={20} color={colors.slate[300]} />
              <View style={s.bellDot} />
            </Pressable>
          </View>
        </View>

        {/* Nursing / Surgical / All switch */}
        <View style={s.switcher}>
          {DISCIPLINES.map((d) => {
            const active = discipline === d.key;
            return (
              <Pressable
                key={d.key}
                onPress={() => setDiscipline(d.key)}
                style={[s.switchBtn, active && s.switchBtnActive]}
              >
                {d.icon ? (
                  <Ionicons
                    name={d.icon}
                    size={14}
                    color={active ? colors.white : colors.slate[400]}
                    style={{ marginRight: 4 }}
                  />
                ) : null}
                <Text style={[s.switchText, active && s.switchTextActive]}>{d.label}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Region bar */}
        <View style={s.regionBar}>
          <View style={s.rowCenter}>
            <Ionicons name="globe-outline" size={14} color={colors.teal[400]} />
            <Text style={s.regionLabel}>Instructor region:</Text>
          </View>
          <View style={s.rowCenter}>
            {REGIONS.map((r) => {
              const active = region === r.key;
              return (
                <Pressable
                  key={r.key}
                  onPress={() => setRegion(r.key)}
                  style={[s.regionBtn, active && s.regionBtnActive]}
                >
                  <Text style={[s.regionText, active && s.regionTextActive]}>
                    {r.flag} {r.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* ---------- BODY ---------- */}
      <ScrollView style={s.body} contentContainerStyle={s.bodyContent}>
        {/* Category chips */}
        <View style={s.rowBetween}>
          <Text style={s.sectionTitle}>Procedure categories</Text>
          <Text style={s.count}>
            {filtered.length} {filtered.length === 1 ? 'Procedure' : 'Procedures'}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
          {CATEGORIES.map((c) => {
            const active = category === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => setCategory(c.key)}
                style={[s.chip, active && s.chipActive]}
              >
                <Text style={[s.chipText, active && s.chipTextActive]}>{c.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Continue learning */}
        <Text style={s.sectionTitle}>Continue learning</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.lg }}>
          {CONTINUE.map((c) => {
            const p = procedures.find((x) => x.id === c.id);
            if (!p) return null;
            const amber = c.tone === 'amber';
            return (
              <Pressable key={c.id} style={s.contCard} onPress={() => comingSoon(p.title)}>
                <View style={s.rowBetween}>
                  <View style={[s.contTag, amber ? s.contTagAmber : s.contTagTeal]}>
                    <Text style={[s.contTagText, { color: amber ? colors.amber[300] : colors.teal[300] }]}>
                      {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
                    </Text>
                  </View>
                  <View style={s.rowCenter}>
                    <Ionicons name="time-outline" size={11} color={colors.slate[400]} />
                    <Text style={s.contTime}> {p.duration}</Text>
                  </View>
                </View>
                <Text style={s.contTitle} numberOfLines={1}>{p.title}</Text>
                <Text style={s.contDesc} numberOfLines={1}>{p.description}</Text>
                <View style={s.contFooter}>
                  <Text style={[s.contProgress, { color: amber ? colors.amber[400] : colors.teal[400] }]}>
                    Step {c.done} of {p.steps.length} Completed
                  </Text>
                  <Ionicons name="arrow-forward" size={12} color={colors.slate[400]} />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Featured procedures */}
        <Text style={s.sectionTitle}>Featured procedures</Text>
        {filtered.length === 0 ? (
          <View style={s.empty}>
            <Ionicons name="folder-open-outline" size={28} color={colors.slate[300]} />
            <Text style={s.emptyText}>No procedures found for this category.</Text>
            <Pressable onPress={() => setCategory('all')}>
              <Text style={s.emptyLink}>Reset category</Text>
            </Pressable>
          </View>
        ) : (
          filtered.map((item) => (
            <Pressable key={item.id} style={s.card} onPress={() => comingSoon(item.title)}>
              <View style={s.thumbWrap}>
                <Image source={{ uri: item.thumbnail }} style={s.thumb} resizeMode="cover" />
                <View style={s.thumbShade} />
                <View style={s.catTag}>
                  <Text style={s.catTagText}>{item.category.toUpperCase()}</Text>
                </View>
                <View style={s.durTag}>
                  <Ionicons name="play" size={9} color={colors.teal[400]} />
                  <Text style={s.durText}> {item.duration}</Text>
                </View>
              </View>
              <View style={s.cardBody}>
                <Text style={s.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={s.cardDesc} numberOfLines={2}>{item.description}</Text>
                <View style={s.cardFooter}>
                  <View style={s.regionPill}>
                    <Text style={s.regionPillText}>
                      {regionInfo.flag} {regionInfo.label} instructors
                    </Text>
                  </View>
                  <Text style={s.steps}>{item.steps.length} Steps</Text>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.slate[50] },
  row: { flexDirection: 'row' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  // header
  header: { backgroundColor: colors.slate[900], paddingHorizontal: 20, paddingBottom: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.slate[800] },
  logo: { width: 36, height: 36, borderRadius: radius.lg, backgroundColor: colors.teal[500], alignItems: 'center', justifyContent: 'center' },
  brand: { color: colors.white, fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  brandSub: { color: colors.teal[400], fontSize: font.tiny, fontWeight: '500', letterSpacing: 0.8, marginTop: 2 },
  contribute: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(20,184,166,0.2)', borderColor: 'rgba(20,184,166,0.3)', borderWidth: 1, borderRadius: radius.lg, paddingVertical: 8, paddingHorizontal: 10 },
  contributeText: { color: colors.teal[300], fontSize: font.small, fontWeight: '600', marginLeft: 4 },
  bell: { padding: 8, marginLeft: 4 },
  bellDot: { position: 'absolute', top: 6, right: 7, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.teal[400] },

  switcher: { flexDirection: 'row', backgroundColor: colors.slate[800], borderColor: colors.slate[700], borderWidth: 1, borderRadius: radius.lg, padding: 4, marginTop: spacing.md },
  switchBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 7, borderRadius: radius.md },
  switchBtnActive: { backgroundColor: colors.teal[500] },
  switchText: { color: colors.slate[400], fontSize: font.body, fontWeight: '600' },
  switchTextActive: { color: colors.white },

  regionBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(2,6,23,0.6)', borderColor: colors.slate[800], borderWidth: 1, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 6, marginTop: spacing.sm },
  regionLabel: { color: colors.slate[400], fontSize: font.small, fontWeight: '500', marginLeft: 6 },
  regionBtn: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginLeft: 4 },
  regionBtnActive: { backgroundColor: colors.teal[600] },
  regionText: { color: colors.slate[400], fontSize: font.tiny, fontWeight: '700' },
  regionTextActive: { color: colors.white },

  // body
  body: { flex: 1 },
  bodyContent: { padding: spacing.lg, paddingBottom: 48 },
  sectionTitle: { color: colors.slate[500], fontSize: font.body, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: spacing.sm },
  count: { color: colors.slate[400], fontSize: font.small, fontWeight: '500', marginBottom: spacing.sm },

  chip: { backgroundColor: colors.white, borderColor: colors.slate[200], borderWidth: 1, borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 7, marginRight: 8 },
  chipActive: { backgroundColor: colors.slate[900], borderColor: colors.slate[900] },
  chipText: { color: colors.slate[700], fontSize: font.body, fontWeight: '600' },
  chipTextActive: { color: colors.white, fontWeight: '700' },

  // continue learning
  contCard: { width: 240, backgroundColor: colors.slate[900], borderColor: colors.slate[700], borderWidth: 1, borderRadius: radius.xl, padding: 14, marginRight: 12 },
  contTag: { borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  contTagTeal: { backgroundColor: 'rgba(20,184,166,0.2)', borderColor: 'rgba(20,184,166,0.3)' },
  contTagAmber: { backgroundColor: 'rgba(245,158,11,0.2)', borderColor: 'rgba(245,158,11,0.3)' },
  contTagText: { fontSize: font.tiny, fontWeight: '700' },
  contTime: { color: colors.slate[400], fontSize: font.tiny },
  contTitle: { color: colors.white, fontSize: font.base, fontWeight: '700', marginTop: 8 },
  contDesc: { color: colors.slate[300], fontSize: font.small, marginTop: 4 },
  contFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.slate[700] },
  contProgress: { fontSize: font.tiny, fontWeight: '600' },

  // featured cards
  card: { backgroundColor: colors.white, borderColor: colors.slate[200], borderWidth: 1, borderRadius: radius.xl, overflow: 'hidden', marginBottom: 12 },
  thumbWrap: { height: 144, backgroundColor: colors.slate[900] },
  thumb: { width: '100%', height: '100%', opacity: 0.9 },
  thumbShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,6,23,0.25)' },
  catTag: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(15,23,42,0.85)', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  catTagText: { color: colors.white, fontSize: 9, fontWeight: '700', letterSpacing: 0.8 },
  durTag: { position: 'absolute', bottom: 10, right: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: radius.md, paddingHorizontal: 8, paddingVertical: 2 },
  durText: { color: colors.white, fontSize: font.tiny, fontWeight: '500' },
  cardBody: { padding: 14 },
  cardTitle: { color: colors.slate[900], fontSize: font.body, fontWeight: '700' },
  cardDesc: { color: colors.slate[500], fontSize: font.small, lineHeight: 17, marginTop: 2 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.slate[100] },
  regionPill: { backgroundColor: colors.medical[50], borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 },
  regionPillText: { color: colors.teal[700], fontSize: font.tiny, fontWeight: '600' },
  steps: { color: colors.slate[400], fontSize: font.tiny, fontWeight: '500' },

  empty: { alignItems: 'center', backgroundColor: colors.white, borderColor: colors.slate[200], borderWidth: 1, borderRadius: radius.xl, padding: 24 },
  emptyText: { color: colors.slate[500], fontSize: font.body, fontWeight: '500', marginTop: 8 },
  emptyLink: { color: colors.teal[600], fontSize: font.body, fontWeight: '700', marginTop: 8 },
});
