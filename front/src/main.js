// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'highlight.js/styles/github.css'

import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink  } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './App'
import router from './router'
import store from './store'
import { VuePlugin } from 'vuera'

Vue.use(VuePlugin)
Vue.use(Vuetify)
Vue.config.productionTip = false

const vuetifyOptions = { }

Vue.use(VueApollo)

const httpLink = new createHttpLink ({
    uri: "//localhost:3000/graphql"
})

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
        addTypename: false
    }),
    connectToDevTools: true
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    el: '#app',
    vuetify: new Vuetify(vuetifyOptions),
    apolloProvider,
    router,
    store,
    components: { App },
    template: '<App/>'
})
