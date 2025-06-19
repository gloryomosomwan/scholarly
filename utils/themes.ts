import tinycolor from "tinycolor2"
import chroma from "chroma-js"

type theme = {
  primary: string,
  secondary: string,
  accent: string,
  text: string,
  inverseText: string,
  grey100: string
  grey200: string
  grey400: string,
  grey500: string
  grey600: string
  success: string
  successText: string
  successBackground: string
  successBorder: string
  warningText: string
  warningBackground: string
  warningBorder: string
  dangerText: string
  dangerBackground: string
  dangerBorder: string
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

  success: '#10B981',

  successText: '#059669',
  successBackground: '#F0FDF4',
  successBorder: '#D1FAE5',
  warningText: '#B45309',
  warningBackground: '#FFFBEB',
  warningBorder: '#FDE68A',
  dangerText: '#B91C1C',
  dangerBackground: '#FEF2F2',
  dangerBorder: '#FECACA',
}

export const lightPriorityColors = {
  high: {
    color: lightTheme['dangerText'],
    backgroundColor: lightTheme['dangerBackground'],
    borderColor: lightTheme['dangerBorder'],
  },
  medium: {
    color: lightTheme['warningText'],
    backgroundColor: lightTheme['warningBackground'],
    borderColor: lightTheme['warningBorder'],
  },
  low: {
    color: lightTheme['successText'],
    backgroundColor: lightTheme['successBackground'],
    borderColor: lightTheme['successBorder'],
    // color: tinycolor(lightTheme['success']).darken(10).saturate(15).toHexString(),
    // backgroundColor: tinycolor(lightTheme['success']).lighten(57).toHexString(),
    // borderColor: tinycolor(lightTheme['success']).lighten(50).toHexString(),
  },
  default: {
    color: lightTheme['text'],
    backgroundColor: lightTheme['primary'],
    borderColor: lightTheme['grey200'],
  }

}

export const darkTheme: theme = {
  primary: '#111827',
  secondary: '#1F2937',
  accent: '#3B82F6',
  text: '#F9FAFB',
  inverseText: '#111827',

  grey100: '#374151',
  grey200: '#374151',
  grey400: '#6B7280',
  grey500: '#9CA3AF',
  grey600: '#D1D5DB',

  success: '#10B981',

  successText: '#34D399',
  successBackground: '#022C22',
  successBorder: '#064E3B',
  warningText: '#FCD34D',
  warningBackground: '#451A03',
  warningBorder: '#92400E',
  dangerText: '#FCA5A5',
  dangerBackground: '#451A1A',
  dangerBorder: '#7F1D1D',
}

export const darkPriorityColors = {
  high: {
    color: darkTheme['dangerText'],
    backgroundColor: darkTheme['dangerBackground'],
    borderColor: darkTheme['dangerBorder'],
  },
  medium: {
    color: darkTheme['warningText'],
    backgroundColor: darkTheme['warningBackground'],
    borderColor: darkTheme['warningBorder'],
  },
  low: {
    // color: darkTheme['successText'],
    // backgroundColor: darkTheme['successBackground'],
    // borderColor: darkTheme['successBorder'],

    color: tinycolor(darkTheme['success']).lighten(20).toHexString(),
    backgroundColor: tinycolor(darkTheme['success']).darken(45).desaturate(15).toHexString(),
    borderColor: tinycolor(darkTheme['success']).darken(35).desaturate(10).toHexString(),
  },
  default: {
    color: darkTheme['text'],
    backgroundColor: darkTheme['grey400'],
    borderColor: darkTheme['grey200'],
  }
}