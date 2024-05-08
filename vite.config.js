import { defineConfig } from 'vite'
import { resolve } from 'path'
import createVitePlugins from './vite/plugins/index.js'

// https://vitejs.dev/config/
export default ({ command }) => {
  return defineConfig({
    plugins: [ ...createVitePlugins(command === 'build') ],
    resolve: {
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components'),
        '@images': resolve('src/assets/images'),
        '@styles': resolve('src/assets/styles'),
      }
    }
  })
}

