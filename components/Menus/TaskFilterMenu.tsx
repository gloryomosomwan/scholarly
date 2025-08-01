import { SymbolView } from 'expo-symbols'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItemTitle, DropdownMenuItemIcon, DropdownMenuCheckboxItem, DropdownMenuGroup, DropdownMenuLabel } from '@/components/Menus/Zeego'
import { useTheme } from '@/hooks/useTheme'
import { courses } from '@/data/data'

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

        <DropdownMenuGroup>
          <DropdownMenuLabel>Courses</DropdownMenuLabel>
          {
            courses.map((course) => {
              return (
                <DropdownMenuCheckboxItem value={filterBy === course.code ? 'on' : 'off'} key={course.code} onSelect={() => handleSelection(course.code)}>
                  <DropdownMenuItemIcon ios={{
                    name: 'circle.fill',
                    pointSize: 20,
                    scale: 'medium',
                    paletteColors: [{ dark: course.color, light: course.color }],
                  }} />
                  <DropdownMenuItemTitle>{course.code}</DropdownMenuItemTitle>
                </DropdownMenuCheckboxItem>
              )
            })
          }
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuCheckboxItem key="high-priority" value={filterBy === 'high-priority' ? 'on' : 'off'} onSelect={() => handleSelection('High Priority')}>
            <DropdownMenuItemTitle>High</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.dangerText, light: theme.dangerText, }],
            }} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem key="medium-priority" value={filterBy === 'medium-priority' ? 'on' : 'off'} onSelect={() => handleSelection('Medium Priority')}>
            <DropdownMenuItemTitle>Medium</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.warningText, light: theme.warningText, }],
            }} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem key="low-priority" value={filterBy === 'low-priority' ? 'on' : 'off'} onSelect={() => handleSelection('Low Priority')}>
            <DropdownMenuItemTitle>Low</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.success, light: theme.success, }],
            }} />
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}