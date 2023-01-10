/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      rotateInfinity: 'rotateInfinity .8s steps(8) infinite',
    },
    keyframes: {
      rotateInfinity: {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        },
      },
    },
    fontFamily:{
      'poppins-black': ['Poppins-Black'],
      'poppins-black-italic': ['Poppins-BlackItalic'],
      'poppins-bold': ['Poppins-Bold'],
      'poppins-bold-italic': ['Poppins-BoldItalic'],
      'poppins-extrabold': ['Poppins-Extrabold'],
      'poppins-extrabold-italic': ['Poppins-ExtraboldItalic'],
      'poppins-extralight': ['Poppins-Extralight'],
      'poppins-extralight-italic': ['Poppins-ExtralightItalic'],
      'poppins-italic': ['Poppins-Italic'],
      'poppins-light': ['Poppins-Light'],
      'poppins-light-italic': ['Poppins-LightItalic'],
      'poppins-medium': ['Poppins-Medium'],
      'poppins-medium-italic': ['Poppins-MediumItalic'],
      'poppins-regular': ['Poppins-Regular'],
      'poppins-semibold': ['Poppins-Semibold'],
      'poppins-semibold-italic': ['Poppins-SemiboldItalic'],
      'poppins-thin': ['Poppins-Thin'],
      'poppins-thin-italic': ['Poppins-ThinItalic'],
    }
  },
  plugins: [],
}
