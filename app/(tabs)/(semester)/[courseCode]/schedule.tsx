import { StyleSheet, ScrollView, Keyboard } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRef, useCallback } from 'react';

import { useTheme } from '@/hooks';
import { useCourseEvents } from '@/hooks/useDatabase';
import { CourseTabsParamList } from '@/types/navigation';

import CourseEventCard from '@/components/CoursePage/CourseEventCard/CourseEventCard';
import AddButton from '@/components/Buttons/AddButton';
import EventTypeModal from '@/components/Modals/EventTypeModal';

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

export default function Schedule() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  const events = useCourseEvents(Number(courseID))
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      {events.map((event) => {
        return <CourseEventCard key={event.type} event={event} />
      })}
      <AddButton handlePress={handlePresentModal} title='Add Event' description='Add an event to your schedule' />
      <EventTypeModal eventTypeSelectorModalRef={modalRef} courseID={courseID} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
