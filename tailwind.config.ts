import type { Config } from 'tailwindcss'

// GitLab Light palette
const gl = {
  bg:           '#FAFAFF',
  bgAlt:        '#F0F0FA',
  bgHighlight:  '#EFEFFC',
  selBg:        '#E2DEF8',
  border:       '#D0D0E8',
  borderDark:   '#B8B8D8',
  fg:           '#303030',
  fgAlt:        '#585870',
  fgComment:    '#7878A8',
  fgGutter:     '#A0A0C0',
  red:          '#A31700',
  green:        '#0A7F3D',
  orange:       '#AF551D',
  blue:         '#006CD8',
  purple:       '#583CAC',
  purpleLight:  '#7B5DC4',
  cyan:         '#00798A',
  link:         '#165390',
  // tints for badges / backgrounds
  blueTint:     '#E8F0FD',
  greenTint:    '#E6F4EC',
  orangeTint:   '#FDF3E6',
  purpleTint:   '#EDE8F8',
  cyanTint:     '#E0F3F5',
}

// GitLab Dark palette
const gd = {
  bg:           '#28262B',
  bgAlt:        '#222025',
  bgHighlight:  '#312F35',
  selBg:        '#5D5277',
  border:       '#3E3C42',
  fg:           '#FFFFFF',
  fgAlt:        '#AEADA8',
  fgComment:    '#8B7AA0',
  fgGutter:     '#666666',
  red:          '#F57F6C',
  green:        '#52B87A',
  orange:       '#D99530',
  blue:         '#7FB6ED',
  purple:       '#AD95E9',
  cyan:         '#32C5D2',
  pink:         '#F88AAF',
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light
        gl,
        // Dark
        gd,
      },
      typography: {
        gitlab: {
          css: {
            '--tw-prose-body': gl.fg,
            '--tw-prose-headings': gl.fg,
            '--tw-prose-lead': gl.fgAlt,
            '--tw-prose-links': gl.blue,
            '--tw-prose-bold': gl.fg,
            '--tw-prose-counters': gl.fgComment,
            '--tw-prose-bullets': gl.fgGutter,
            '--tw-prose-hr': gl.border,
            '--tw-prose-quotes': gl.fgAlt,
            '--tw-prose-quote-borders': gl.purple,
            '--tw-prose-code': gl.purple,
            '--tw-prose-pre-code': gl.fg,
            '--tw-prose-pre-bg': gl.bgAlt,
            '--tw-prose-th-borders': gl.border,
            '--tw-prose-td-borders': gl.bgHighlight,
            maxWidth: 'none',
            code: {
              backgroundColor: gl.bgHighlight,
              color: gl.purple,
              padding: '0.15em 0.35em',
              borderRadius: '0.25rem',
              fontWeight: '500',
              border: `1px solid ${gl.border}`,
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            pre: {
              backgroundColor: gl.bgAlt,
              border: `1px solid ${gl.border}`,
            },
            blockquote: {
              borderLeftColor: gl.purple,
              color: gl.fgAlt,
            },
            'h1,h2,h3,h4': { color: gl.fg },
            a: { color: gl.blue },
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
