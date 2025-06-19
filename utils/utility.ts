export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export function getSecondGradientColor(hex: string, factor: number = 0.15): string {
  const cleanHex = hex.replace('#', '');

  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);

  const newR = Math.max(0, Math.round(r * (1 - factor)));
  const newG = Math.max(0, Math.round(g * (1 - factor)));
  const newB = Math.max(0, Math.round(b * (1 - factor)));

  const toHex = (num: number): string => num.toString(16).padStart(2, '0');

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

export const getColorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};