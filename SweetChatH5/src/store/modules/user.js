import router, { resetRouter } from "@/router";
import { baseURL } from "@/config";
import { commonLogin, phoneLogin } from "@/api_v2/modules/login";
import { Message } from "element-ui";

const state = {
  name: "",
  userId: JSON.parse(sessionStorage.getItem("User"))
    ? JSON.parse(sessionStorage.getItem("User")).id
    : "",
  avatar: "",
  roles: [],
  baseURL: baseURL,
  loginInfo: {},
  showSearch: false,
  showMine: false,
};

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_USERID: (state, userId) => {
    state.userId = userId;
  },

  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = [...roles];
  },
  SET_LOGIN_INFO: (state, info) => {
    state.loginInfo = { ...info };
  },
  SET_SEARCHINFO: (state, newState) => {
    state.showSearch = newState;
  },
  SET_CHANGE_MINE: (state, newState) => {
    state.showMine = newState;
  },
};

const actions = {
  login({ commit, dispatch }, loginObj) {
    const { loginMethod, loginParms } = loginObj;
    return new Promise((resolve, reject) => {
      switch (loginMethod) {
        case "phone":
          phoneLogin(loginParms)
            .then((res) => {
              if (res.result) {
                loginSuccess(res, commit, dispatch);
              } else {
                Message.error(res.errorMsg);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
          break;
        case "common":
          commonLogin(loginParms)
            .then((res) => {
              if (res.result) {
                loginSuccess(res, commit, dispatch);
              } else {
                Message.error(res.errorMsg);
              }
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
          break;
        default:
          break;
      }
    });
  },
  // user logout
  logout({ commit, state }) {
    commit("SET_NAME", "");
    commit("SET_USERID", "");
    commit("SET_AVATAR", "");
    commit("SET_ROLES", []);
    commit("SET_LOGIN_INFO", {});
    commit("SET_SEARCHINFO", false);
    commit("SET_CHANGE_MINE", false);
    localStorage.clear();
    sessionStorage.clear();
    router.replace({ path: "/login" });
    resetRouter();
  },
};

function loginSuccess(res, commit, dispatch) {
  commit("SET_LOGIN_INFO", res.data);
  const id = res.data.userInfo.id;
  const name = res.data.userInfo.nickname;
  sessionStorage.setItem("User", JSON.stringify({ name, id }));
  sessionStorage.setItem("userToken", res.data.userInfo.token);
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
