const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  avatar: (state) => state.user.avatar,
  notice_num: (state) => state.user.notice_num,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  bloggerInfo: (state) => state.user.bloggerInfo,
  baseURL: (state) => state.user.baseURL,
  userId: (state) => state.user.userId,
  loginInfo: (state) => state.user.loginInfo,
};
export default getters;
