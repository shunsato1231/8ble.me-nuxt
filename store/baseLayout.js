export const state = () => ({
  header: true,
  sidebar: true,
  archive: true
})

export const getters = {
  headerFlag (state) {
    return state.header
  },
  sidebarFlag (state) {
    return state.sidebar
  },
  archiveFlag (state) {
    return state.archive
  }
}

export const mutations = {
  changeHeaderFlag (state, flag) {
    state.header = flag
  },
  changeSidebarFlag (state, flag) {
    state.sidebar = flag
  },
  changeArchiveFlag (state, flag) {
    state.archive = flag
  }
}

export const actions = {
  setHeaderFlag ({ commit }, flag) {
    commit('changeHeaderFlag', flag)
  },
  setSidebarFlag ({ commit }, flag) {
    commit('changeSidebarFlag', flag)
  },
  setArchiveFlag ({ commit }, flag) {
    commit('changeArchiveFlag', flag)
  }
}
