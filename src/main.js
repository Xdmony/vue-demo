import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import '@/assets/css/global.css'

const app = createApp(App)
for (const name in ElIcons){
    app.component(name, ElIcons[name])
}

app.use(store).use(router).use(ElementPlus,
    {
        locale: zhCn,
        size: 'small'
    })
    .mount('#app')
