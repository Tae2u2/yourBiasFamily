/**
 * 공통 스타일 상수
 */

export const COLORS = {
  primary: {
    light: 'amber-50',
    medium: 'amber-100',
    dark: 'amber-700',
    darker: 'amber-800',
    darkest: 'amber-900',
  },
  accent: {
    purple: 'purple-600',
    purpleLight: 'purple-100',
    pink: 'pink-600',
    pinkLight: 'pink-100',
  },
  status: {
    success: 'green-600',
    successLight: 'green-100',
    error: 'red-600',
    info: 'blue-600',
    infoLight: 'blue-100',
  },
} as const;

export const FONTS = {
  serif: { fontFamily: 'serif' },
} as const;

export const COMMON_CLASSES = {
  container: 'max-w-6xl mx-auto',
  card: 'bg-white rounded-lg shadow-lg p-6',
  button: {
    primary: 'bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-lg transition',
    success: 'bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-lg transition shadow-lg',
  },
  input: 'w-full px-4 py-2 border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:outline-none',
  badge: {
    success: 'bg-green-100 border-2 border-green-600 rounded-lg px-4 py-2',
    info: 'bg-blue-100 border-2 border-blue-600 rounded-lg px-4 py-2',
  },
} as const;

export const LAYOUT = {
  pageBackground: 'min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-4 md:p-8',
  sectionSpacing: 'space-y-6',
} as const;
