import vue from '@vitejs/plugin-vue'
import createRestart from './restart'
import createAutoImport from './auto-import'
import createComponents from './components'
import createSetupExtend from './setup-extend'
import createSvgIcon from './svg-icon'

export default function createVitePlugins(isBuild = false) {
  const vitePlugins = [vue()]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createComponents(isBuild))
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  return vitePlugins
}
