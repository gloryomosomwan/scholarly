import { StyleSheet, ScrollView, Keyboard } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useCallback } from 'react';

import { useTheme } from '@/hooks';
import { useCourseEvents } from '@/hooks/useDatabase';
import { CourseTabsParamList } from '@/types/navigation';
import { EventType } from '@/types';

import CourseEventCard from '@/components/CoursePage/CourseEventCard/CourseEventCard';
import AddButton from '@/components/Buttons/AddButton';
import EventTypeModal from '@/components/Modals/EventTypeModal';

type AssignmentsRoute = RouteProp<CourseTabsParamList, 'Assignments'>;

const eventTypes: EventType[] = ['lecture', 'lab', 'seminar']

export default function Schedule() {
  const theme = useTheme()
  const { params: { courseID } } = useRoute<AssignmentsRoute>()
  const courseEvents = useCourseEvents(Number(courseID))
  const filtered = eventTypes.filter((eventType) => courseEvents.every((courseEvent) => courseEvent.type !== eventType))
  const modalRef = useRef<BottomSheetModal>(null)
  const handlePresentModal = useCallback(() => {
    Keyboard.dismiss()
    modalRef.current?.present();
  }, []);
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.primary }]} >
      {courseEvents.map((event) => {
        return <CourseEventCard key={event.type} event={event} />
      })}
      {filtered.length > 0 && <AddButton handlePress={handlePresentModal} title='Add Course Event' description="Add an event to this course's schedule" />}
      <EventTypeModal eventTypeSelectorModalRef={modalRef} courseID={courseID} events={filtered} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
