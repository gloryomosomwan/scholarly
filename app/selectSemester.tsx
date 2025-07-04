import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'

import { useTheme } from '@/hooks'
import SemesterItem from '@/components/SemesterItem'

const semesters = [
	{
		id: '1',
		name: 'Fall 2025',
		start: new Date(2025, 8, 1),
		end: new Date(2025, 11, 15),
		courses: 4,
	},
	{
		id: '2',
		name: 'Spring 2025',
		start: new Date(2025, 0, 10),
		end: new Date(2025, 4, 20),
		courses: 5,
	},
	{
		id: '3',
		name: 'Summer 2024',
		start: new Date(2024, 5, 6),
		end: new Date(2024, 8, 2),
		courses: 2,
	},
]

export default function SelectSemester() {
	const theme = useTheme()

	return (
		<View style={[styles.container, { backgroundColor: theme.secondary }]}>
			<Text style={[styles.header, { color: theme.text }]}>Select Semester</Text>
			<ScrollView contentContainerStyle={styles.listContainer}>
				{semesters.map(item => (
					<SemesterItem
						key={item.id}
						item={item}
						onPress={() => {
							/* handle select */
						}}
					/>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 32,
	},
	header: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 24,
	},
	listContainer: {
		gap: 16,
		paddingBottom: 24,
	},
})