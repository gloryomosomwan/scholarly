import { SymbolView } from 'expo-symbols'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon } from '@/components/Menus/Zeego'
import { useTheme } from '@/hooks/useTheme'

type TaskSortMenuProps = {
  handleSelection: (sortBy: string) => void
}

export default function TaskSortMenu({ handleSelection }: TaskSortMenuProps) {
  const theme = useTheme()
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SymbolView name={'line.3.horizontal.decrease'} tintColor={theme.accent} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem key="course" onSelect={() => handleSelection('course')}>
          <DropdownMenuItemIcon ios={{
            name: 'book',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
          <DropdownMenuItemTitle>Course</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuItem key="priority" onSelect={() => handleSelection('priority')}>
          <DropdownMenuItemTitle>Priority</DropdownMenuItemTitle>
          <DropdownMenuItemIcon ios={{
            name: 'flag.fill',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: 'red', light: 'red', }],
          }} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}