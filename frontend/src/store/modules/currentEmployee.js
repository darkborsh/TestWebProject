export default {
    state: {
        currentEmpl: null
    },
    getters: {
        getCurrentEmpl(state) {
            return state.currentEmpl
        }
    },
    mutations: {
        updateEmpl(state, empl) {
            state.curremtEmpl = empl
        }
    },
    actions: {
        changeCurrentEmpl(ctx, empl) {
            ctx.commit('updateEmpl', empl)
        }
    }
}