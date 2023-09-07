import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        grayScreen: '#FAFAFF',
        SystemBrand: '#3A81F7',
        SystemSecondaryBrand: '#EBF2FE',
        SystemGray9: '#BBBBCB',
        SystemGray7: '#FAFAFF',
        SystemGray6: '#F5F5FF',
        SystemGray5: '#DDDDED',
        SystemGray4: '#CCCCDC',
        SystemGray3: '#9999A9',
        SystemGray2: '#666676',
        SystemGray1: '#212131',
        SystemDarkBlue: '#212131',
        SystemPurple: '#3A42F7',
        SystemLightPurple: '#EBECFE',
        SystemRed: '#F73A3A',
        SystemPink: '#FEEBEB',
        SystemGreen: '#47E121',
        SystemLightGreen: '#EDFCE9',
        SystemYellow: '#F7CD3A',
        SystemLightYellow: '#FEFAEB',
        SystemGray7_20: 'hsla(240, 100%, 99%, 0.2)',
        SystemHoverBlue: '#0101DF'
      },
      width: {
        'fix': '800px',
      },
    },
  },
  plugins: [],
}
export default config
