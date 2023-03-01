import pageTools from './pageTools'
// import { UploadExcel } from 'UploadExcel'
export default {
    install(Vue){
        Vue.component('pageTools',pageTools)
        // Vue.component('UploadExcel',UploadExcel)
    }
}