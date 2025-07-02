import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon } from '@/components/Menus/Zeego'
import { useTheme } from '../../utils/useTheme'

export default function Menu() {
  const theme = useTheme()
  const router = useRouter()
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SymbolView name={'ellipsis'} size={20} tintColor={theme.grey400} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem key="edit" onSelect={() => router.navigate('/edit-activity')}>
          <DropdownMenuItemIcon ios={{
            name: 'pencil',
            pointSize: 20,
            weight: 'semibold',
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
          <DropdownMenuItemTitle>Edit Activity</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuItem key="delete" destructive>
          <DropdownMenuItemTitle>Delete Activity</DropdownMenuItemTitle>
          <DropdownMenuItemIcon ios={{
            name: 'trash',
            pointSize: 20,
            weight: 'semibold',
            scale: 'medium',
            paletteColors: [{ dark: 'red', light: 'red', }],
          }} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}