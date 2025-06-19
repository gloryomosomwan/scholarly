type theme = {
  primary: string,
  secondary: string,
  accent: string,
  text: string,
  inverseText: string,
  lightBlue: string
  grey100: string
  grey200: string
  grey400: string,
  grey500: string
  grey600: string
  success: string
  successSoft: string
  successSofter: string
  successHard: string
  dangerSoft: string
  dangerSofter: string
}

export const lightTheme: theme = {
  primary: '#F9FAFB',
  secondary: '#FFFFFF',

  accent: "#0055FF",

  text: '#374151',
  inverseText: '#FFFFFF',


  grey100: '#F3F4F6',
  grey200: '#E5E7EB',
  grey400: '#9CA3AF',
  grey500: '#6B7280',
  grey600: '#4B5563',

  lightBlue: '#EFF6FF',
  success: '#10B981',
  successSoft: '#D1FAE5',
  successSofter: '#F0FDF4',
  successHard: '#059669',
  dangerSoft: '#FECACA',
  dangerSofter: '#FEF2F2',
}

export const darkTheme: theme = {
  primary: '#111827',
  secondary: '#1F2937',
  accent: '#3B82F6',
  text: '#F9FAFB',
  inverseText: '#111827',
  lightBlue: '#1E3A8A',

  grey100: '#374151',
  grey200: '#374151',
  grey400: '#6B7280',
  grey500: '#9CA3AF',
  grey600: '#D1D5DB',

  success: '#10B981',
  successSoft: '#064E3B',
  successSofter: '#022C22',
  successHard: '#34D399',
  dangerSoft: '#7F1D1D',
  dangerSofter: '#451A1A',
}

export const lightPriorityColors = {
  high: {
    backgroundColor: lightTheme['dangerSofter'],
    borderColor: lightTheme['dangerSoft'],
    color: '#B91C1C',
  },
  medium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#B45309',
  },
  low: {
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
export const darkPriorityColors = {
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
    backgroundColor: darkTheme['grey400'],
    // borderColor: darkTheme['mediumGrey'],
    color: darkTheme['text'],
  }
}