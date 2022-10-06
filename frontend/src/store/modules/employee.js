import _ from "lodash";

export default {
  state: {
    empls: [],
    selectedItem: 0,
    show: true
  },
  getters: {
    getAllEmpls(state) {
      return state.empls
    },

    getEmplById(state) {
      return state.empls[state.selectedItem]
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
    },

    deleteEmployee(ctx, deletingPayload) {
      let currentEmplArray = JSON.parse(localStorage.getItem(deletingPayload.key))
      currentEmplArray.splice(deletingPayload.deletingId, 1);
      localStorage.setItem(deletingPayload.key, JSON.stringify(currentEmplArray))
      ctx.commit("setNewEmpls", currentEmplArray)
      ctx.commit("updateSelectedItem", -1)
    },

    saveEmployee(ctx, savingPayload) {
      let correctFio = savingPayload.emp.fio !== null && savingPayload.inputValidations.fioValidate
      let correctPassSeria = savingPayload.emp.passSeria !== null && savingPayload.inputValidations.passSeriaValidate
      let correctPassNo = savingPayload.emp.passNo !== null && savingPayload.inputValidations.passNoValidate
      if (correctFio && correctPassSeria && correctPassNo) {
        let newEmplArray = JSON.parse(localStorage.getItem(savingPayload.key))
        newEmplArray.push(savingPayload.emp)
        localStorage.setItem(savingPayload.key, JSON.stringify(newEmplArray))
        ctx.commit("setNewEmpls", newEmplArray)
        return true
      } else {
        console.log(
          "Wrong saving employee data: " +
          savingPayload.emp.fio +
          " " +
          savingPayload.emp.passSeria +
          " " +
          savingPayload.emp.passNo
        )
        return false
      }
    },

    resaveEmployee(ctx, resavingPayload) {
      let newEmplArray = JSON.parse(localStorage.getItem(resavingPayload.key))
      newEmplArray[resavingPayload.resavingId] = resavingPayload.resavedEmpl
      localStorage.setItem(resavingPayload.key, JSON.stringify(newEmplArray))
      ctx.commit("setNewEmpls", newEmplArray)
    }
  }
}