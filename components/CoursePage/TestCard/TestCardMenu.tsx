import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'
import { eq } from 'drizzle-orm'
import { ActionSheetIOS } from 'react-native'

import { useTheme } from '@/hooks/useTheme'
import { db } from '@/db/init'
import { tests } from '@/db/schema'

import { DropdownMenuRoot, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuItemTitle, DropdownMenuItemIcon } from '@/components/Zeego'

type TestCardMenuProps = {
  testID: number
  courseID: number
  setGradeModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  grade: number | undefined
}

export default function TestCardMenu({ testID, courseID, setGradeModalVisible, grade }: TestCardMenuProps) {
  const theme = useTheme()
  const router = useRouter()

  async function removeGrade() {
    await db.update(tests).set({ grade: null }).where(eq(tests.id, testID))
  }

  const confirmDelete = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Delete test'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
      }
      ,
      async buttonIndex => {
        if (buttonIndex === 0) {
          // Cancel action
        } else if (buttonIndex === 1) {
          await db.delete(tests).where(eq(tests.id, testID))
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
            pathname: '/test-form',
            params: {
              id: testID,
              courseID: courseID
            }
          }
        )}>
          <DropdownMenuItemIcon ios={{
            name: 'pencil',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
          <DropdownMenuItemTitle>Edit test</DropdownMenuItemTitle>
        </DropdownMenuItem>

        <DropdownMenuItem key="grade" onSelect={() => grade === undefined ? setGradeModalVisible(true) : removeGrade()}>
          <DropdownMenuItemTitle>{grade === undefined ? 'Add grade' : 'Remove grade'}</DropdownMenuItemTitle>
          <DropdownMenuItemIcon ios={{
            name: 'percent',
            pointSize: 20,
            scale: 'medium',
            paletteColors: [{ dark: theme.text, light: theme.text, }],
          }} />
        </DropdownMenuItem>

        <DropdownMenuItem key="delete" destructive onSelect={confirmDelete}>
          <DropdownMenuItemTitle>Delete test</DropdownMenuItemTitle>
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