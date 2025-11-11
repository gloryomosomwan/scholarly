import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'
import { eq } from 'drizzle-orm'
import { ActionSheetIOS } from 'react-native'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon } from '@/components/Zeego'

import { useTheme } from '@/hooks/useTheme'
import { db } from '@/db/init'
import { events } from '@/db/schema'

type MenuProps = {
  eventID: number
}

export default function Menu({ eventID }: MenuProps) {
  const theme = useTheme()
  const router = useRouter()

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete event'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(events).where(eq(events.id, eventID))
        }
      }
    )
  }

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <SymbolView name={'ellipsis'} size={20} tintColor={theme.grey400} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem key="edit" onSelect={() => router.navigate(
          {
            pathname: '/event-form',
            params: {
              id: eventID
            }
          }
        )}>
          <DropdownMenuItemIcon ios={{
            name: 'pencil',
            pointSize: 20,
            weight: 'semibold',
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
          <DropdownMenuItemTitle>Edit Event</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuItem key="delete" destructive onSelect={confirmDelete}>
          <DropdownMenuItemTitle>Delete Event</DropdownMenuItemTitle>
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