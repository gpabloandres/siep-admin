// Modelo MenuToolBar

const module = {
  state: {
    title: "SIEP",
    header_color: 'primary'
  },
  mutations: {
    updateTitle(state,payload) {
      state.title = payload
    }
  }
};

export default module