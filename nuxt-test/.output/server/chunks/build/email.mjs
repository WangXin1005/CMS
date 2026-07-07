function validatePassword(password) {
  if (!password) {
    return "请输入密码";
  }
  if (password.length < 12 || password.length > 16) {
    return "密码长度需为 12~16 位";
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[\]!@#$%^&*()_+\-=[{}|;:,.<>?/~`]/.test(password)) {
    return "密码需包含大小写字母、数字和特殊字符";
  }
  return null;
}
function validateUsername(username) {
  if (!username) {
    return "请输入用户名";
  }
  if (username.length < 4 || username.length > 15) {
    return "用户名长度需为 4~15 位";
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "用户名只能包含大小写字母和数字";
  }
  return null;
}
function validateEmail(email) {
  if (!email) {
    return "请输入邮箱地址";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "邮箱格式不正确";
  }
  return null;
}

export { validateEmail as a, validatePassword as b, validateUsername as v };
//# sourceMappingURL=email.mjs.map
