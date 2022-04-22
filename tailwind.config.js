module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screen:{
        sm: '480px',
        md: '768px',
        lg: '960px',
        xl: '1440px',
      },
      colors:{
        primary:'#EF3F39',
        secondary:'#4A86D5',
        white:'#FBFBFB',
        gray:{
          light:'#F6F7F8',
          dark:'#3A3A3A'
        }
        
      },
      fontFamily:{
        'sans':['Nunito Sans','Noto Sans TC','sans-serif'],
        'serif':['Merriweather', 'serif']
      },
      container:{
        center:true,
        padding:{
          DEFAULT: '1rem',
        }
      },
    },
  }
}
