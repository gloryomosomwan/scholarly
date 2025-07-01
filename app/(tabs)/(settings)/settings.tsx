import { StyleSheet, ScrollView } from 'react-native';

import SettingsGroup from '@/components/SettingsPage/SettingsGroup';

export default function Tab() {
  return (
    <ScrollView style={[styles.container, {}]} contentInsetAdjustmentBehavior='automatic' >
      <SettingsGroup title={'GENERAL'} />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
});
