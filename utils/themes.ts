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
  successBorder: string
  successBackground: string
  successText: string
  dangerBorder: string
  dangerBackground: string
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
  successBorder: '#D1FAE5',
  successBackground: '#F0FDF4',
  successText: '#059669',
  dangerBorder: '#FECACA',
  dangerBackground: '#FEF2F2',
}

export const lightPriorityColors = {
  high: {
    backgroundColor: lightTheme['dangerBackground'],
    borderColor: lightTheme['dangerBorder'],
    color: '#B91C1C',
  },
  medium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    color: '#B45309',
  },
  low: {
    backgroundColor: lightTheme['successBackground'],
    borderColor: lightTheme['successBorder'],
    color: lightTheme['successText']
    // backgroundColor: tinycolor(lightTheme['success']).lighten(57).toHexString(),
    // borderColor: tinycolor(lightTheme['success']).lighten(50).toHexString(),
    // color: tinycolor(lightTheme['success']).darken(10).saturate(15).toHexString()
  },
  default: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    color: '#374151',
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
  successBorder: '#064E3B',
  successBackground: '#022C22',
  successText: '#34D399',
  dangerBorder: '#7F1D1D',
  dangerBackground: '#451A1A',
}

export const darkPriorityColors = {
  high: {
    backgroundColor: darkTheme['dangerBackground'],
    borderColor: darkTheme['dangerBorder'],
    color: '#FCA5A5',
  },
  medium: {
    backgroundColor: '#451A03',
    borderColor: '#92400E',
    color: '#FCD34D',
  },
  low: {
    backgroundColor: darkTheme['successBackground'],
    borderColor: darkTheme['successBorder'],
    color: darkTheme['successText']

    // backgroundColor: tinycolor(darkTheme['success']).spin(-10).desaturate(20).darken(28).toHexString(),
    // borderColor: tinycolor(darkTheme['success']).darken(25).toHexString(),
    // color: tinycolor(darkTheme['success']).lighten(8).saturate(15).toHexString()
  },
  default: {
    backgroundColor: darkTheme['grey400'],
    // borderColor: darkTheme['mediumGrey'],
    color: darkTheme['text'],
  }
}