import fetch from '../fetch'
//登录
export const login = data => {
  return fetch({
    url: "api/backend/login-by-username",
    method: "post",
    createLogin:true,
    data
  })
}
//退出登录
// sp_id
export const loginOut = data => {
  return fetch({
    url: '/login/logout',
    method: 'post',
    data
  })
}
// 博主账号列表
export const bloggerList = data => {
  return fetch({
    url: '/api/backend/authorized-blogger-list',
    method: 'post',
    data
  })
}
// 切换博主账号
export const checkAccount = data => {
  return fetch({
    url: '/api/backend/switch-user-account',
    method: 'post',
    data
  })
}
// 取消使用博主账号
export const cancenAccount = data => {
  return fetch({
    url: '/api/backend/cancel-authorization',
    method: 'post',
    data
  })
}

