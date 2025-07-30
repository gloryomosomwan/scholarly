import { SymbolView } from 'expo-symbols'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon, DropdownMenuCheckboxItem } from '@/components/Menus/Zeego'
import { useTheme } from '@/hooks/useTheme'

type TaskFilterMenuProps = {
  handleSelection: (filterBy: string) => void
  filterBy: string | null
}

export default function TaskFilterMenu({ handleSelection, filterBy }: TaskFilterMenuProps) {
  const theme = useTheme()
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SymbolView name={'line.3.horizontal.decrease'} tintColor={theme.accent} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuCheckboxItem key="course" value={filterBy === 'course' ? 'on' : 'off'} onSelect={() => handleSelection('course')}>
          <DropdownMenuItemIcon ios={{
            name: 'book',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
          <DropdownMenuItemTitle>Course</DropdownMenuItemTitle>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem key="priority" value={filterBy === 'priority' ? 'on' : 'off'} onSelect={() => handleSelection('priority')}>
          <DropdownMenuItemTitle>Priority</DropdownMenuItemTitle>
          <DropdownMenuItemIcon ios={{
            name: 'flag.fill',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: 'red', light: 'red', }],
          }} />
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}