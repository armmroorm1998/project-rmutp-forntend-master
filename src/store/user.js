export const user = {
    namespaced: true,
    actions: {
        getUsername: ({ commit }, Username) => {
            commit('addUsername', Username)
        },
        getUserID:({commit}, userId) => {
            commit('addUserID', userId)
        },
        getAdminID:({commit}, adminId) => {
            commit('addAdminID', adminId)
        },
        getToken: ({ commit }, token) => {
            commit('addToken', token)
        },
        getAvatar:({commit},urlAvatar) =>{
            commit('setAvatar',urlAvatar)
        },
        getStat:({commit},Boolean) => {
            commit('setStat',Boolean)
        },
        logout: ({ commit }) => {
            commit('remove')
        }
    }, state: {
            username: null,
            token: null,
            urlAvatar: null,
            userId: null,
            adminId: null,
            stat: false
    }, mutations: {
        addUsername: (state, newUsername) => {
            state.username = newUsername
        },
        addAdminID: (state,adminId) => {
            state.adminId = adminId
        },
        addUserID: (state, userId) => {
            state.userId = userId
        },
        addToken: (state, newToken) => {
            state.token = newToken
            localStorage.setItem('token', newToken)
        },
        setAvatar:(state, urlAvatar) => {
            state.urlAvatar = urlAvatar
        },
        setStat:(state, Boolean) => {
            state.stat = Boolean
        },
        remove: (state) => {
            state.username = null
            state.token = null
            state.urlAvatar = null
            state.stat = false
            state.adminId = null
            state.userId = null
            localStorage.removeItem('token', null)
        }
    }, getters: {
            username: state => state.username,
            token: state => state.token,
            urlAvatar: state => state.urlAvatar,
            stat: state => state.stat,
            userId : state => state.userId,
            adminId : state => state.adminId
    }
}