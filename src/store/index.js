import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: {
            titulo: '',
            estado: false
        }
    },
    mutations: {
        mostrarLoading(state, payLoad) {
            state.loading.titulo = payLoad.titulo
            state.loading.estado = true
        },
        ocultarLoading(state) {
            state.loading.estado = false
        }
    },
    actions: {},
    modules: {}
})
