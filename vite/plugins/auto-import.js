import autoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
    ],
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
      globalsPropValue: true
    },
    resolvers: [
      ElementPlusResolver()
    ],
    dts: false
  })
}
