import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'
import { eq } from 'drizzle-orm'
import { ActionSheetIOS } from 'react-native'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon } from '@/components/Zeego'

import { useTheme } from '@/hooks/useTheme'
import { db } from '@/db/init'
import { tasks } from '@/db/schema'

type TaskCardMenuProps = {
  taskID: number
}

export default function TaskCardMenu({ taskID }: TaskCardMenuProps) {
  const theme = useTheme()
  const router = useRouter()

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete task'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(tasks).where(eq(tasks.id, taskID))
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
            pathname: '/task-form',
            params: {
              id: taskID
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
          <DropdownMenuItemTitle>Edit Task</DropdownMenuItemTitle>
        </DropdownMenuItem>
        <DropdownMenuItem key="delete" destructive onSelect={confirmDelete}>
          <DropdownMenuItemTitle>Delete Task</DropdownMenuItemTitle>
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