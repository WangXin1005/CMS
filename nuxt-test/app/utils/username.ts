/**
 * 用户名验证工具
 * 规则：长度 4~15 位，只能包含大小写字母和数字
 * 依次校验，返回第一条不满足的规则提示
 */
export function validateUsername(username) {
  if (!username) {
    return "请输入用户名"
  }
  if (username.length < 4 || username.length > 15) {
    return "用户名长度需为 4~15 位"
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "用户名只能包含大小写字母和数字"
  }
  return null // 验证通过
}
