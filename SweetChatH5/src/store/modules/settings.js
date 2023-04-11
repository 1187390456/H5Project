import defaultSettings from '@/settings'

const { showSettings,  sidebarLogo, fullscreen } = defaultSettings

const state = {
  showSettings,  
  sidebarLogo,
  fullscreen
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },

  SET_FULLSCREEN: (state,data)=>{
    state.fullscreen = data
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

