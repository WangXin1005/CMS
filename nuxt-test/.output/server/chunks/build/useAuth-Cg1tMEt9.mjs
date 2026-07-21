import { q as request } from './request-BRr5oPTU.mjs';
import { u as useCookie } from './cookie-CqLf-Dw-.mjs';
import { computed, ref } from 'vue';
import { u as useRouter } from './server.mjs';

const useAuth = () => {
  const token = useCookie("auth_token", { default: () => "", sameSite: "lax" });
  const username = useCookie("username", { default: () => "", sameSite: "lax" });
  const role = useCookie("user_role", { default: () => "", sameSite: "lax" });
  const isLoggedIn = computed(() => {
    if (typeof sessionStorage !== "undefined") {
      return !!token.value && !!sessionStorage.getItem("auth_session");
    }
    return !!token.value;
  });
  const hasSuperAdmin = ref(false);
  const checking = ref(true);
  const checkSuperAdmin = async () => {
    checking.value = true;
    try {
      const res = await request.get("/users/check");
      hasSuperAdmin.value = res.data.exists;
    } catch {
      hasSuperAdmin.value = false;
    } finally {
      checking.value = false;
    }
  };
  const initSuperAdmin = async (data) => {
    const res = await request.post("/users/init", data);
    return res.data;
  };
  const login = async (data) => {
    const res = await request.post("/auth/login", data);
    const { token: newToken, username: resUsername, role: resRole } = res.data;
    token.value = newToken;
    username.value = resUsername;
    role.value = resRole;
    sessionStorage.setItem("auth_session", "1");
  };
  const registerGuest = async (data) => {
    const res = await request.post("/auth/register", data);
    return res.data;
  };
  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {
    }
    token.value = "";
    username.value = "";
    role.value = "";
    sessionStorage.removeItem("auth_session");
    const router = useRouter();
    router.push("/");
  };
  const checkUsername = async (username2) => {
    const res = await request.get("/users/check-username", { params: { username: username2 } });
    return res.data.taken;
  };
  const getUserList = async (page = 1, size = 10) => {
    const res = await request.get("/users", { params: { page, size } });
    return res.data;
  };
  const createUser = async (data) => {
    const res = await request.post("/users", data);
    return res.data;
  };
  const updateUser = async (id, data) => {
    const res = await request.put(`/users/${id}`, data);
    return res.data;
  };
  const changePassword = async (data) => {
    const res = await request.put("/users/me/password", data);
    return res.data;
  };
  const deleteUser = async (id) => {
    const res = await request.delete(`/users/${id}`);
    return res.data;
  };
  return {
    token,
    username,
    role,
    isLoggedIn,
    hasSuperAdmin,
    checking,
    checkSuperAdmin,
    initSuperAdmin,
    login,
    registerGuest,
    logout,
    checkUsername,
    changePassword,
    getUserList,
    createUser,
    updateUser,
    deleteUser
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-Cg1tMEt9.mjs.map
