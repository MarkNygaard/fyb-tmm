/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      textColor: {
        skin: {
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          accent: withOpacity('--color-accent'),
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity('--color-primary'),
          secondary: withOpacity('--color-secondary'),
          accent: withOpacity('--color-accent'),
          left: withOpacity('--color-left'),
          right: withOpacity('--color-right'),
        },
      },
      gridTemplateRows: {
        bio: '1fr 1fr 4fr 1fr',
        bioText: '1fr 1fr 6fr 1fr',
        footerXLarge: '1fr 3fr 3fr 1fr 1fr 1fr',
        footerLarge: '1fr 3fr 3fr 3fr 1fr 1fr',
        footerMedium: '4fr 3fr 4fr 1fr 1fr',
        footerSmall: '4fr 4fr 3fr 3fr 3fr 1fr 1fr',
      },
      gridTemplateColumns: {
        bio: '3fr 1fr 1fr 8fr 1fr',
        bioText: '1fr 6fr 1fr',
        footerLarge: '1fr 6fr 1fr 3fr 3fr 1fr',
        footerMedium: '1fr 6fr 1fr 6fr 1fr',
      },
      height: {
        132: '33rem',
      },
      width: {
        132: '33rem',
      },
    },
  },
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'md:grid-cols-1',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
    'xl:grid-cols-1',
    'xl:grid-cols-2',
    'xl:grid-cols-3',
    'xl:grid-cols-4',
    'order-1',
    'order-2',
    'order-3',
    'order-4',
    'order-5',
    'order-6',
    'order-7',
    'order-8',
    'order-9',
    'order-10',
    'order-11',
    'order-12',
    'order-13',
    'order-14',
    'order-15',
    'order-16',
    'md:order-1',
    'md:order-2',
    'md:order-3',
    'md:order-4',
    'md:order-5',
    'md:order-6',
    'md:order-7',
    'md:order-8',
    'md:order-9',
    'md:order-10',
    'md:order-11',
    'md:order-12',
    'md:order-13',
    'md:order-14',
    'md:order-15',
    'md:order-16',
    'xl:order-1',
    'xl:order-2',
    'xl:order-3',
    'xl:order-4',
    'xl:order-5',
    'xl:order-6',
    'xl:order-7',
    'xl:order-8',
    'xl:order-9',
    'xl:order-10',
    'xl:order-11',
    'xl:order-12',
    'xl:order-13',
    'xl:order-14',
    'xl:order-15',
    'xl:order-16',
    'gap-2',
    'gap-4',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-safe-area'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
    }),
  ],
};
