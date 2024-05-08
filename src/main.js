import { createApp } from 'vue'
import App from './App.vue'
import '@styles/globals.scss'

const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

app.mount('#app')
