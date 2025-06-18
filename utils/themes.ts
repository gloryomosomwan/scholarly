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
  accent: '#3B82F6',
  text: '#F9FAFB',
  inverseText: '#111827',
  mediumGrey: '#6B7280',
  charcoal: '#F9FAFB',
  subdued: '#9CA3AF',
  darkGrey: '#D1D5DB',
  lightBlue: '#1E3A8A',
  lightGrey: '#374151',
  offWhite: '#374151',
  success: '#10B981',
  successSoft: '#064E3B',
  successSofter: '#022C22',
  successHard: '#34D399',
  dangerSoft: '#7F1D1D',
  dangerSofter: '#451A1A',
  assignmentSoft: '#1E40AF',
  assignment: '#3B82F6'
}

export const priorityColors2 = {
  high: {
    // backgroundColor: '#FEF2F2',
    // borderColor: '#FECACA',
    color: '#B91C1C',

    backgroundColor: lightTheme['dangerSofter'],
    borderColor: lightTheme['dangerSoft'],
  },
  medium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#B45309',
  },
  low: {
    // backgroundColor: '#F0FDF4',
    // borderColor: '#BBF7D0',
    // color: '#166534',

    backgroundColor: lightTheme['successSofter'],
    borderColor: lightTheme['successSoft'],
    color: lightTheme['successHard']
  },
  default: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    color: '#374151',
  }

}
export const priorityColors = {
  high: {
    backgroundColor: darkTheme['dangerSofter'],
    borderColor: darkTheme['dangerSoft'],
    color: '#FCA5A5',
  },
  medium: {
    backgroundColor: '#451A03',
    borderColor: '#92400E',
    color: '#FCD34D',
  },
  low: {
    backgroundColor: darkTheme['successSofter'],
    borderColor: darkTheme['successSoft'],
    color: darkTheme['successHard']
  },
  default: {
    backgroundColor: darkTheme['tertiary'],
    borderColor: darkTheme['mediumGrey'],
    color: darkTheme['text'],
  }
}