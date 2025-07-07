import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useTheme } from '@/hooks';
import PressableOpacity from '@/components/Buttons/PressableOpacity';

type RecurrenceModalProps = {
  onClose: () => void;
  initialSelectedDays?: string[];
  onSave?: (selectedDays: string[]) => void;
}

export default function RecurrenceModal({ onClose, initialSelectedDays = [], onSave }: RecurrenceModalProps) {
  const theme = useTheme();
  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState<string[]>(initialSelectedDays);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDay = (day: string) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const handleSave = () => {
    onSave?.(selectedDays);
    onClose();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <PressableOpacity onPress={() => router.back()}>
          <SymbolView name="chevron.left" tintColor={theme.text} size={24} />
        </PressableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Repeat</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.contentContainer}>
        {/* Days of the week */}
        <View style={[styles.daysContainer, { backgroundColor: theme.secondary }]}>
          {daysOfWeek.map((day, index) => (
            <PressableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={[
                styles.dayItem,
                index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.grey200 },
              ]}
            >
              <Text style={[styles.dayText, { color: theme.text }]}>{day}</Text>
              {selectedDays.includes(day) && (
                <SymbolView name="checkmark.circle.fill" tintColor={theme.accent} size={20} />
              )}
            </PressableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  daysContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dayText: {
    fontSize: 16,
  },
}); 