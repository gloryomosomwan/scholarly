import { SymbolView } from 'expo-symbols'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon, DropdownMenuCheckboxItem } from '@/components/Menus/Zeego'
import { useTheme } from '@/hooks/useTheme'

type TaskSortMenuProps = {
  handleSelection: (sortBy: string) => void
  sortBy: string | null
}

let courses = ['CHEM 105', 'MATH 123', 'MAX 023']

export default function TaskSortMenu({ handleSelection, sortBy }: TaskSortMenuProps) {
  const theme = useTheme()
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SymbolView name={'arrow.up.arrow.down'} tintColor={theme.accent} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>

        {
          courses.map((el) => {
            return (
              <DropdownMenuCheckboxItem value={sortBy === 'Course' ? 'on' : 'off'} key={el} onSelect={() => handleSelection(el)}>
                <DropdownMenuItemIcon ios={{
                  name: 'graduationcap.fill',
                  pointSize: 20,
                  scale: 'medium',
                  paletteColors: [{ dark: theme.accent, light: theme.accent, }],
                }} />
                <DropdownMenuItemTitle>{el}</DropdownMenuItemTitle>
              </DropdownMenuCheckboxItem>
            )
          })
        }

        <DropdownMenuCheckboxItem value={sortBy === 'Priority' ? 'on' : 'off'} key="priority" onSelect={() => handleSelection('Priority')}>
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