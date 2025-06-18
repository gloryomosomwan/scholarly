type theme = {
  primary: string,
  secondary: string,
  tertiary: string,
  accent: string,
  text: string,
  inverseText: string,
  mediumGrey: string,
  charcoal: string
  subdued: string
  darkGrey: string
  lightBlue: string
  lightGrey: string
  offWhite: string
  success: string
  successSoft: string
  successSofter: string
  successHard: string
  dangerSoft: string
  dangerSofter: string
  assignment: string
  assignmentSoft: string
}

export const lightTheme: theme = {
  primary: '#F9FAFB',
  secondary: '#FFFFFF',
  tertiary: '#BCBEC4',
  accent: "#007FFF",
  text: '#374151',
  inverseText: '#FFFFFF',
  mediumGrey: '#9CA3AF',
  charcoal: '#111827',
  subdued: '#6B7280',
  darkGrey: '#4B5563',
  lightBlue: '#EFF6FF',
  lightGrey: '#E5E7EB',
  offWhite: '#F3F4F6',
  success: '#10B981',
  successSoft: '#D1FAE5',
  successSofter: '#F0FDF4',
  successHard: '#059669',
  dangerSoft: '#FECACA',
  dangerSofter: '#FEF2F2',
  assignmentSoft: '#2563EB',
  assignment: '#1D4ED8'
}

export const darkTheme: theme = {
  primary: '#111827',
  secondary: '#1F2937',
  tertiary: '#374151',
  accent: '#007bff',
  text: '#F9FAFB',
  inverseText: '#111827',
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