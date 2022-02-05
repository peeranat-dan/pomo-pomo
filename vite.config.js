import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    EnvironmentPlugin({
      SUPABASE_URL: 'https://qjkoynljumxyjpethyls.supabase.co',
      SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI3NDEyNCwiZXhwIjoxOTU4ODUwMTI0fQ.ERxTZxiqFU-M9tk6wR3nnQ5aTzOc1Ky2cfvjDSBPT7M'
    })
  ]
})
