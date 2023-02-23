import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 读取svg文件夹下全部的.svg文件
const req = require.context('./svg', false, /\.svg$/)
// 将svg文件夹下全部的.svg文件全部引入到
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
