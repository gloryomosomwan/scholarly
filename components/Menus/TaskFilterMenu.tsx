import { SymbolView } from 'expo-symbols'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItemTitle, DropdownMenuItemIcon, DropdownMenuCheckboxItem, DropdownMenuGroup, DropdownMenuLabel } from '@/components/Menus/Zeego'
import { useTheme } from '@/hooks/useTheme'
import { courses } from '@/data/data'
import { FilterOption } from '@/types/types'

type TaskFilterMenuProps = {
  filterBy: FilterOption | null
  handleSetFilterBy: (filterBy: FilterOption) => void
  filterValue: string | null
  handleSetFilterValue: (filterValue: string) => void
}

export default function TaskFilterMenu({ handleSetFilterBy, handleSetFilterValue, filterBy, filterValue }: TaskFilterMenuProps) {
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
                <DropdownMenuCheckboxItem value={filterBy === course.code ? 'on' : 'off'} key={course.code} onSelect={() => {
                  handleSetFilterBy('Course')
                  handleSetFilterValue(course.code)
                }}>
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
          <DropdownMenuCheckboxItem key="high-priority" value={filterValue === 'high' ? 'on' : 'off'} onSelect={() => {
            handleSetFilterBy('Priority')
            handleSetFilterValue('high')
          }}>
            <DropdownMenuItemTitle>High</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.dangerText, light: theme.dangerText, }],
            }} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem key="medium-priority" value={filterValue === 'medium' ? 'on' : 'off'} onSelect={() => {
            handleSetFilterBy('Priority')
            handleSetFilterValue('medium')
          }}>
            <DropdownMenuItemTitle>Medium</DropdownMenuItemTitle>
            <DropdownMenuItemIcon ios={{
              name: 'flag.fill',
              pointSize: 20,
              scale: 'medium',
              paletteColors: [{ dark: theme.warningText, light: theme.warningText, }],
            }} />
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem key="low-priority" value={filterValue === 'low' ? 'on' : 'off'} onSelect={() => {
            handleSetFilterBy('Priority')
            handleSetFilterValue('low')
          }}>
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