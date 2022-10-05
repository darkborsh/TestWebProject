export default {
    state: {
        empls: [],
        selectedItem: 0
    },
    getters: {
        getAllEmpls(state) {
            return state.empls
        },

        getSelectedItem(state) {
            return state.selectedItem
        }
    },
    mutations: {
        setNewEmpls(state, newEmpls) {
            state.empls = newEmpls
        },

        updateSelectedItem(state, newItem) {
            state.selectedItem = newItem
        }
    },
    actions: {
        async fetchEmpls(ctx, keyStorage) {
            const newEmpls = await JSON.parse(localStorage.getItem(keyStorage))
            ctx.commit("setNewEmpls", newEmpls)
        },

        selectItem(ctx, newItem) {
          if (newItem !== null && newItem !== this.state.selectedItem) {
              ctx.commit("updateSelectedItem", newItem)
          }
        }
    }
}