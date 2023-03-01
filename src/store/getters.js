const getters = {
  token: state => state.user.token, //token的快捷访问
  companyId: state => state.user.userInfo.companyId, // 公司 ID
}
export default getters
