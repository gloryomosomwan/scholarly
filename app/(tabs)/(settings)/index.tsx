import { StyleSheet, ScrollView } from 'react-native';

import SettingsGroup from '@/components/SettingsPage/SettingsGroup';
import SettingsItem from '@/components/SettingsPage/SettingsItem';

export default function Tab() {
  return (
    <ScrollView style={[styles.container, {}]} contentInsetAdjustmentBehavior='automatic' >
      <SettingsGroup title={'GENERAL'}>
        <SettingsItem title={'Notifications'} icon='bell.fill' />
      </SettingsGroup>

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
});
