function validatePassword(password) {
  if (!password) {
    return "\u8BF7\u8F93\u5165\u5BC6\u7801";
  }
  if (password.length < 12 || password.length > 16) {
    return "\u5BC6\u7801\u957F\u5EA6\u9700\u4E3A 12~16 \u4F4D";
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[\]!@#$%^&*()_+\-=[{}|;:,.<>?/~`]/.test(password)) {
    return "\u5BC6\u7801\u9700\u5305\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u7279\u6B8A\u5B57\u7B26";
  }
  return null;
}
function validateUsername(username) {
  if (!username) {
    return "\u8BF7\u8F93\u5165\u7528\u6237\u540D";
  }
  if (username.length < 4 || username.length > 15) {
    return "\u7528\u6237\u540D\u957F\u5EA6\u9700\u4E3A 4~15 \u4F4D";
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "\u7528\u6237\u540D\u53EA\u80FD\u5305\u542B\u5927\u5C0F\u5199\u5B57\u6BCD\u548C\u6570\u5B57";
  }
  return null;
}
function validateEmail(email) {
  if (!email) {
    return "\u8BF7\u8F93\u5165\u90AE\u7BB1\u5730\u5740";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E";
  }
  return null;
}

export { validateEmail as a, validatePassword as b, validateUsername as v };
//# sourceMappingURL=email-CEn54U6N.mjs.map
