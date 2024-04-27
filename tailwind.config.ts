import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      colors: {
        'yellowgreen': '#adff2f',
      },
      margin: {
        'top': '-45px',
        'stakingpoolmargin': '60px',
        'timermargin': '210px',
        'left': '210px',
        'negativeleftmargin': '-90px',
        'negativeleftmarginpayout': '-90px',
        'governencetopmargin': '85px',
        'govleft': '-110px',
        'headingovtop': '90px',
        'headingleft': '20px',
        'lawtop': '50px',
      },
      padding: {
        'top': '98px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;


