type theme = {
  primary: string,
  secondary: string,
  tertiary: string,
  accent: string,
  text: string,
  inverseText: string,
  danger: string,
  warning: string,
}

export const lightTheme: theme = {
  primary: 'white',
  secondary: '#F8F8F8',
  tertiary: '#bcbec4',
  accent: "#007bff",
  text: 'black',
  inverseText: 'white',
  danger: 'red',
  warning: 'gold',
}

export const darkTheme: theme = {
  primary: 'black',
  secondary: '#151616',
  tertiary: '#505050',
  accent: '#007bff',
  text: 'white',
  inverseText: 'black',
  danger: 'red',
  warning: 'gold',
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