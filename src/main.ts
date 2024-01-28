import './assets/main.css'

import { createApp } from 'vue'
import { defaultConfig, plugin } from '@formkit/vue'

import App from './App.vue'
import { createLocalStoragePlugin } from '@formkit/addons'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const app = createApp(App)
app
  .use(Toast, options)
  .use(
    plugin,
    defaultConfig({
      plugins: [
        createLocalStoragePlugin({
          control: undefined,
          maxAge: 3600000,
          debounce: 200,
          key: undefined,
          prefix: undefined
        })
      ]
    })
  )
  .mount('#app')
