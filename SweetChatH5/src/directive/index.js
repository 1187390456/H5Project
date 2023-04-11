import Vue from 'vue'
const content = require.context('./modules', true, /\.js$/)
import { Draggable } from 'draggable-vue-directive'
let modules = {}
content.keys().forEach(d => {
  const dModle = content(d)
  let dd = d.split('/')
  let name = dd[dd.length - 1].split('.js')[0]
  let namespace = {}
  namespace[name] = dModle.default
  modules = { ...modules, ...namespace }
})
Vue.directive('draggable', Draggable)
Object.keys(modules).forEach(key => {
  Vue.directive(key, modules[key])
})
