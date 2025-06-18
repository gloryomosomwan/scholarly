type theme = {
  primary: string,
  secondary: string,
  tertiary: string,
  accent: string,
  text: string,
  inverseText: string,
  danger: string,
  warning: string,
  symbol: string,
  highContrastText: string
  subdued: string
  secondaryText: string
  divider: string
  tag: string
  tag2: string
}

export const lightTheme: theme = {
  primary: '#F9FAFB',
  secondary: '#FFFFFF',
  tertiary: '#BCBEC4',
  accent: "#007FFF",
  text: '#374151',
  inverseText: '#FFFFFF',
  danger: 'red',
  warning: 'gold',
  symbol: '#9CA3AF',
  highContrastText: '#111827',
  subdued: '#6B7280',
  secondaryText: '#4B5563',
  tag: '#EFF6FF',
  divider: '#E5E7EB',
  tag2: '#F3F4F6'
}

export const darkTheme: theme = {
  primary: '#111827',
  secondary: '#1F2937',
  tertiary: '#374151',
  accent: '#007bff',
  text: '#F9FAFB',
  inverseText: '#111827',
  danger: '#EF4444',
  warning: '#F59E0B',
}

export const priorityColors = {
  high: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    color: '#B91C1C',
  },
  medium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#B45309',
  },
  low: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
    color: '#166534',
  },
  default: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    color: '#374151',
  }

}