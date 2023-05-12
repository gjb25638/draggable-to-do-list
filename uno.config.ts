import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  shortcuts: {
    center: 'flex items-center justify-center',
  },
  theme: {
    breakpoints: {
      xs: '768px',
      sm: '768px',
      md: '992px',
      lg: '1280px',
      xl: '1920px',
    },
  },
})