export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getColorPalette = (color: string) => {
  type Intensity = 'light' | 'medium' | 'dark' | 'darker';
  type ColorPalette = Record<Intensity, string>;
  type ColorMap = Record<string, ColorPalette>;

  const colorMap: ColorMap = {
    '#007FFF': {
      light: '#EFF6FF',
      medium: '#BFDBFE',
      dark: '#1D4ED8',
      darker: '#1E3A8A'
    },
    '#10B981': {
      light: '#D1FAE5',
      medium: '#86EFAC',
      dark: '#059669',
      darker: '#047857'
    },
    '#F59E0B': {
      light: '#FEF3C7',
      medium: '#FCD34D',
      dark: '#D97706',
      darker: '#B45309'
    },
    '#EF4444': {
      light: '#FECACA',
      medium: '#FCA5A5',
      dark: '#DC2626',
      darker: '#B91C1C'
    },
    '#8B5CF6': {
      light: '#EDE9FE',
      medium: '#C4B5FD',
      dark: '#7C3AED',
      darker: '#6D28D9'
    },
    '#06B6D4': {
      light: '#CFFAFE',
      medium: '#67E8F9',
      dark: '#0891B2',
      darker: '#0E7490'
    }
  };
  return colorMap[color]
}