import request from "~/utils/request"

/**
 * 认证管理组合式函数
 * 管理用户的登录状态、Token、用户名及超级管理员权限检查
 */
export const useAuth = () => {
    // Cookie 持久化：Token、用户名、角色
    const token = useCookie("auth_token", { default: () => "" })
    const username = useCookie("username", { default: () => "" })
    const role = useCookie("user_role", { default: () => "" })

    /** 是否已登录（Token 存在即视为已登录）*/
    const isLoggedIn = computed(() => !!token.value)

    /** 是否存在超级管理员（需调用 checkSuperAdmin 确认）*/
    const hasSuperAdmin = ref(false)
    /** 是否正在检查超级管理员（防止重复请求、显示加载状态） */
    const checking = ref(true)

    /**
     * 检查当前系统是否存在超级管理员
     * 无论成功或失败，最终都会将 checking 置为 false
     */
    const checkSuperAdmin = async () => {
        checking.value = true
        try {
            const res = await request.get("/users/check")
            hasSuperAdmin.value = res.data.exists
        } catch {
            hasSuperAdmin.value = false
        } finally {
            checking.value = false
        }
    }

    /**
     * 初始化超级管理员（首次部署时设置）
     * @param data.username - 用户名
     * @param data.email - 邮箱
     * @param data.password - 密码
     */
    const initSuperAdmin = async (data: {
        username: string
        email: string
        password: string
    }) => {
        const res = await request.post("/users/init", data)
        return res.data
    }

    /**
     * 用户登录
     * 提交用户名与密码，成功后从响应中提取 token、用户名和角色并写入 Cookie 实现持久化
     * @param data.username - 用户名
     * @param data.password - 密码
     */
    const login = async (data: {
        username: string
        password: string
    }) => {
        const res = await request.post("/auth/login", data)
        const { token: newToken, username: resUsername, role: resRole } = res.data
        token.value = newToken
        username.value = resUsername
        role.value = resRole
    }

    /**
     * 访客自助注册
     * 注册后自动获得 GUEST 角色（只读权限）
     * @param data.email - 邮箱
     * @param data.username - 用户名
     * @param data.password - 密码
     */
    const registerGuest = async (data: {
        email: string
        username: string
        password: string
    }) => {
        const res = await request.post("/auth/register", data)
        return res.data
    }

    /**
     * 退出登录
     * 清除 Cookie 中的 token、用户名和角色，重置响应式状态
     */
    const logout = () => {
        token.value = ""
        username.value = ""
        role.value = ""
        const router = useRouter(); router.push("/")
    }

    /** 检查用户名是否已被使用 */
    const checkUsername = async (username: string) => {
        const res = await request.get("/users/check-username", { params: { username } })
        return res.data.taken
    }

    /**
     * 获取用户列表（分页）
     * @param page - 页码，从 1 开始，默认 1
     * @param size - 每页条数，默认 10
     */
    const getUserList = async (page: number = 1, size: number = 10) => {
        const res = await request.get("/users", { params: { page, size } })
        return res.data
    }

    /** 创建用户（需 ADMIN/SUPERADMIN）*/
    const createUser = async (data: {
        username: string; email: string; password: string; role: string
    }) => {
        const res = await request.post("/users", data)
        return res.data
    }

    /** 更新用户信息（需 ADMIN/SUPERADMIN）*/
    const updateUser = async (id: number, data: {
        username?: string; email?: string; role?: string
    }) => {
        const res = await request.put(`/users/${id}`, data)
        return res.data
    }

    /** 删除用户（仅 SUPERADMIN）*/
    /** 修改当前用户密码 */
    const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
        const res = await request.put("/users/me/password", data)
        return res.data
    }

        const deleteUser = async (id: number) => {
        const res = await request.delete(`/users/${id}`)
        return res.data
    }

        return { token, username, role, isLoggedIn, hasSuperAdmin, checking, checkSuperAdmin, initSuperAdmin, login, registerGuest, logout, checkUsername, changePassword, getUserList, createUser, updateUser, deleteUser }
}
