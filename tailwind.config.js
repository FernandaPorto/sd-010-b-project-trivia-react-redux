module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary_color: 'var(--primary_color)',
        secundary_color: 'var(--secundary_color)',
        yellow_dead_color: 'var(--yellow_dead_color)',
        light_gray_color: 'var(--light_gray_color)',
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      minHeight: {
        0: '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
