import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '@/pages/MainPage'
import GraphPage from '@/pages/GraphPage'

Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
        {
            path: '/graph/:domain',
            name: 'GraphPage',
            components: {
                default: GraphPage
            },
            props: {
                default: true,
            },
        }
    ]
})
