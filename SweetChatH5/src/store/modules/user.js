import router, { resetRouter } from "@/router";
import { baseURL } from "@/config";
import { login, cancenAccount } from "@/api_v2/modules/login";
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
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        username,
        password,
      })
        .then((res) => {
          const { result, data } = res;
          if (result) {
            var { bgUserID: id, nickname: name, bgUserToken: token } = data;
            commit("SET_NAME", name);
            commit("SET_USERID", id);
            // commit("SET_AVATAR", body.avatar);
            // 不能写这里  你写这里的话
            sessionStorage.setItem("User", JSON.stringify({ name, id }));
            sessionStorage.setItem("token", token);
          } else {
            Message.error(res.errorMsg);
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state }) {
    console.log(state);
    var bloggerUserID = 0;
    cancenAccount({ bloggerUserID })
      .then((res) => {
        commit("SET_NAME", "");
        commit("SET_USERID", "");
        commit("SET_AVATAR", "");
        commit("SET_ROLES", []);
        commit("SET_INFO", {});
        localStorage.clear();
        sessionStorage.clear();
        router.replace({ path: "/login" });
        resetRouter();
      })
      .catch((error) => {
        reject(error);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
