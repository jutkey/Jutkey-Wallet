// @ts-nocheck
/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

// eslint-disable-next-line no-unused-vars
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba($color:var(${variableName}),  $alpha:${opacityValue})`;
    }
    return `rgba($color:var(${variableName}), $alpha: 1)`;
  };
}
module.exports = {
  darkMode: 'class',
  lightMode: 'class',
  important: '#body',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // textOpacity: ['dark'],
      //  backgroundColor: ['dark'],
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif', 'serif'],
        publico: ['Publico Text', 'sans-serif', 'serif']
      },
      fontSize: {
        icon: '24px',
        small: '12px'
      },
      maxWidth: {
        70: '70%'
      },
      width: {
        img: '24px',
        49: '49%',
        19: '19%',
        100: '100px',
        30: '30%'
      },
      minHeight: {
        300: '300px'
      },
      height: {
        '40px': '40px',
        header: '64px',
        words: '144px',
        nft: '360px'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        success: '#04b78a',
        title: '#242f57',
        white: '#fff',
        primary: 'linear-gradient(270deg, #3961f5 0%, #5e81f7 100%)',
        blue: 'var(--link-hover)',
        gray: '#f7f7f7',
        tinge: '#97a0c3',
        place: '#bfc7e0',
        lime: '#04B78A',
        dimGray: '#C0C0C0',
        warn: '#b47d00',
        ashy: '#aab0b7',
        'bg-warn': 'rgba(219, 154, 4, 0.2)',
        error: '#ee2e6b',
        'bg-success': 'rgba(0, 201, 167, 0.2)'
      },
      backgroundImage: {
        'login-big': "url('/src/assets/image/login.png')",
        'user-image': 'var(--bg-assets)'
      },
      backgroundSize: {
        '100%': '100% 100%'
      },
      margin: {
        '20px': '20px',
        '15vh': '15vh',
        '3%': '3%'
      },
      padding: {
        '20px': '20px',
        '15vh': '15vh',
        '5%': '5%',
        '3%': '3%'
      },
      backgroundColor: {
        basic: 'var(--bg-base)',
        'basic-box': 'var(--bg-base-box)',
        side: 'var(--bg-side)',
        btn: 'var(--bg-active)'
      },
      textColor: {
        first: 'var(--color-text-first)',
        secnod: 'var(--color-text-second)',
        third: 'var(--color-text-third)',
        muted: 'var(--color-text-muted)',
        'light-blue': 'var(--color-text-blue)',
        'tinge-text': 'var(--color-text-tinge)',
        'muted-hover': 'var(--color-text-muted-hover)',
        active: 'var(--bg-active)'
      },
      borderColor: {
        basic: 'var(--border-base)',
        'basic-box': 'var(--bg-base-box)',
        'light-blue': 'var(--color-text-blue)',
        btn: 'var(--bg-active)',
        active: 'var(--bg-btn-hover)',
        gary: 'var(--color-border)'
      },
      boxShadow: {
        xl: '0px 2px 6px rgba(28,41,90,0.04)'
      }
    }
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: '32px', color: '#242f57', fontWeight: 'bolder' },
        h2: { fontSize: '22px', color: '#242f57', fontWeight: 'bolder' },
        h3: { fontSize: '18px', color: '#242f57', fontWeight: 'bolder' },
        h4: { fontSize: '16px', color: '#242f57', fontWeight: 'bolder' },
        ':root': {
          '--text-lime': '#04b78a',
          '--text-blue': '#003380',
          '--text-white': '#fff',
          '--bg-base': '#f4f7fc',
          '--bg-side': '#e1e8fb',
          '--bg-base-box': '#fff',
          '--border-base': '#eaedf7',
          '--color-text-base': '#4A5373',
          '--color-text-blue': '#3961f5',
          '--color-text-muted': '#242f57',
          '--color-border': '#dcdfe6',
          '--color-text-muted-hover': theme('colors.gray.200'),
          '--bg-assets': "url('./src/assets/image/user-light.png')",
          '--link-hover': '#00ffa6'
        },
        '.light': {
          '--bg-active': '#3961F5',
          '--link-hover': '#3961F5',
          '--bg-base': '#f4f7fc',
          '--bg-base-box': '#fff',
          '--bg-side': '#e1e8fb',
          '--bg-home': '#EEF2FF',
          '--bg-btn-hover': '#409eff',
          '--bg-home-header':
            'linear-gradient(270deg, #EEF2FF 0%, #FFFFFF 100%)',
          '--border-base': '#eaedf7',
          '--color-text-first': '#242F57',
          '--color-text-second': '#4A5373',
          '--color-text-third': '#83889C',
          '--color-text-muted': '#242f57',
          '--color-text-blue': '#3961f5',
          '--color-text-tinge': '#97a0c3',
          '--color-border': '#dcdfe6',
          '--color-text-muted-hover': theme('colors.gray.200'),
          '--bg-assets': "url('/src/assets/image/user-light.png')",
          '--bg-shadow':
            '0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset',
          '--color-border-inner': '#dcdfe6',
          '--color-inner': '#dcdfe6'
        },
        '.dark': {
          '--bg-active': '#102D23',
          '--link-hover': '#00ffa6',
          '--bg-base': '#111111',
          '--bg-side': '#102D23',
          '--bg-base-box': '#1C1C1C',
          '--bg-home': '#1C1C1C',
          '--bg-btn-hover': '#00ffa6',
          '--border-base': '#646464',
          '--bg-home-header': '#1C1C1C',
          '--color-text-first': '#f6f6f6',
          '--color-text-second': '#a0a0a0',
          '--color-text-third': '#737373',
          '--color-text-blue': 'rgba(255, 255, 255, 0.9)',
          '--color-border': '#022E22',
          '--color-text-muted': 'rgba(255, 255, 255, 0.9)',
          '--color-text-tinge': 'rgba(255, 255, 255, 0.7)',
          '--color-text-muted-hover': theme('colors.gray.200'),
          '--bg-assets': "url('/src/assets/image/user-dark.png')",
          '--bg-shadow': '0 0 0 1px #102D23 inset',
          '--bg-shadow-focus': '0 0 0 1px #022E22 inset',
          '--color-border-inner': '#102d23',
          '--color-inner': '#a0a0a0'
        }
      });
    })
  ]
};
