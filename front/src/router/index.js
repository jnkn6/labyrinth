import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/pages/MainPage'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
    ]
})
