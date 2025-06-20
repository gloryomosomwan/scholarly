import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Svg, { Circle } from 'react-native-svg';

import { useTheme } from '@/utils/useTheme';
import tinycolor from 'tinycolor2';

type ProgressCardProps = {
  completedToday: number;
  totalTasks: number;
  type: string;
};

export default function ProgressCard({ completedToday, totalTasks, type }: ProgressCardProps) {
  const completionPercentage = totalTasks > 0 ? (completedToday / totalTasks) * 100 : 0;
  const theme = useTheme();

  const size = 120;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardContent, { backgroundColor: theme.secondary, borderColor: theme.grey200 }]}>
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <SymbolView name={type === 'tasks' ? 'checklist' : 'doc.text'} tintColor={theme.accent} />
          </View>
          <Text style={[styles.itemTypeText, { color: theme.text }]}>
            {type === 'tasks' ? 'TASKS' : 'ASSIGNMENTS'}
          </Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.circularProgressContainer}>
            <Svg width={size} height={size} style={styles.circularProgress}>
              {/* Background circle */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={tinycolor(theme.accent).setAlpha(0.10).toRgbString()}
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Progress circle */}
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={theme.accent}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </Svg>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.percentageText, { color: theme.text }]}>
                {completedToday}/{totalTasks}
              </Text>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  itemTypeText: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgress: {
    transform: [{ rotate: '0deg' }],
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
  },
  quotientContainer: {
    alignItems: 'flex-end',
  },
  quotientText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '400',
  },
});