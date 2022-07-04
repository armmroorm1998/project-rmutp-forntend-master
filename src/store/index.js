import Vue from 'vue';
import Vuex from 'vuex'

import { user } from './user'
import { food } from './food'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        food
    },
    plugins: [createPersistedState(
        {
            key: 'authorization',
            paths: ['user','food']
        },
        { storage: window.sessionStorage }
    )],
})
