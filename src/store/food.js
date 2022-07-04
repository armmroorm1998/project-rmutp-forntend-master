export const food = {
  namespaced: true,
  actions: {
    getDetailFood: ({ commit }, food) => {
      commit('addDetailFood', food)
    },
    setDetailFood: ({ commit }, foods) => {
      commit('setDetailFoods', foods)
    },
    getIngredients: ({ commit }, Data) => {
      commit('addIngredients', Data)
    },
    getModelUpdate: ({ commit }, DataUpdate) => {
      commit('addModelUpdate', DataUpdate)
    },
    getTabelData: ({ commit }, DataTable) => {
      commit('addgetTabelData', DataTable)
    },
    deleteData: ({ commit }) => {
        commit('removeData')
    }
  }, state: {
    food: Object,
    detail: Object,
    data: null,
    dataUpdate: null,
    TablesData:null
    
  }, mutations: {
    addDetailFood: (state, addFood) => {
      state.food = addFood
    },
    addgetTabelData: (state, addtable) => {
      state.TablesData = addtable
    },
    setDetailFoods: (state, addFoods) => {
      state.detail = addFoods
    },
    addIngredients: (state, addData) => {
      state.data = addData
    },
    addModelUpdate: (state, addDataUpdate) => {
      state.dataUpdate = addDataUpdate
    },
    removeData: (state) => {
      state.food = Object
      state.detail = Object
      state.data = null
      state.dataUpdate = null
      state.TablesData = null
  }
  }, getters: {
    detailFood: state => state.food,
    detailFoods: state => state.detail,
    getData: state => state.data,
    getDataUpdate : state => state.dataUpdate,
    getTableData : state => state.TablesData,
  }
}