const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  notice_num: (state) => state.user.notice_num,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  baseURL: (state) => state.user.baseURL,
  userId: (state) => state.user.userId,
  loginInfo: (state) => state.user.loginInfo,
  showMine: (state) => state.user.showMine,
};
export default getters;
