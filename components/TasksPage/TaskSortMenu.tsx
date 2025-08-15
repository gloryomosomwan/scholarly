import { SymbolView } from 'expo-symbols'
import { StyleSheet } from 'react-native'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItemTitle, DropdownMenuItemIcon, DropdownMenuCheckboxItem } from '@/components/Zeego'
import PressableOpacity from '@/components/Buttons/PressableOpacity'

import { useTheme } from '@/hooks/useTheme'
import { TaskSortOption } from '@/types'

type TaskSortMenuProps = {
  handleSelection: (sortBy: TaskSortOption) => void
  sortBy: string | null
}

export default function TaskSortMenu({ handleSelection, sortBy }: TaskSortMenuProps) {
  const theme = useTheme()
  return (
    <PressableOpacity style={styles.container}>
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <SymbolView name={'arrow.up.arrow.down'} tintColor={theme.accent} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem value={sortBy === 'Course' ? 'on' : 'off'} key="Course" onSelect={() => handleSelection('Course')}>
            <DropdownMenuItemIcon ios={{
              name: 'graduationcap.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.accent, light: theme.accent, }],
            }} />
            <DropdownMenuItemTitle>Course</DropdownMenuItemTitle>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem value={sortBy === 'Priority' ? 'on' : 'off'} key="priority" onSelect={() => handleSelection('Priority')}>
            <DropdownMenuItemTitle>Priority</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.accent, light: theme.accent }],
            }} />
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </PressableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  }
})