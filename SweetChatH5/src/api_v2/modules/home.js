import fetch from '../fetch'
// 登录
export const homeProgressing = data => {
  return fetch({
    url: '/home/active-content',
    method: 'post',
    data
  })
}

export const homeData = data => {
  return fetch({
    url: '/home/my-data',
    method: 'post',
    data
  })
}

export const officialNotic = data => {
  return fetch({
    url: '/home/official-notice',
    method: 'post',
    data
  })
}

export const greeText = data => {
  return fetch({
    url: '/green/text',
    method: 'post',
    data
  })
}
