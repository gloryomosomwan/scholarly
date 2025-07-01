// design-system/dropdown-menu.tsx
import * as DropdownMenu from 'zeego/dropdown-menu'

export const DropdownMenuRoot = DropdownMenu.Root
export const DropdownMenuContent = DropdownMenu.Content

// notice that we're using the create() function
export const DropdownMenuItem = DropdownMenu.create(
  (props: React.ComponentProps<typeof DropdownMenu.Item>) => (
    <DropdownMenu.Item {...props} style={{ height: 34 }} />
  ),
  'Item'
)

// ...see "Full code samples" below to see the rest of the file