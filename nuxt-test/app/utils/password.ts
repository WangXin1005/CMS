/**
 * 密码验证工具
 * 规则：12~16 位，必须包含大写字母、小写字母、数字、特殊符号
 * 依次校验，返回第一条不满足的规则提示
 */
export function validatePassword(password) {
  if (!password) {
    return "请输入密码"
  }
  if (password.length < 12 || password.length > 16) {
    return "密码长度需为 12~16 位"
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/.test(password)) {
    return "密码需包含大小写字母、数字和特殊字符"
  }
  return null // 验证通过
}
