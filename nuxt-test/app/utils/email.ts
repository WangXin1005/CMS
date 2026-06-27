/**
 * 邮箱验证工具
 * 校验规则：必须包含 @，@ 前后不能为空，@ 后必须有域名（包含 .）
 */
export function validateEmail(email) {
  if (!email) {
    return "请输入邮箱地址"
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "邮箱格式不正确"
  }
  return null // 验证通过
}
