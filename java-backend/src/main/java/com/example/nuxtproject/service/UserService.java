package com.example.nuxtproject.service;

import com.example.nuxtproject.entity.Role;
import com.example.nuxtproject.entity.User;
import com.example.nuxtproject.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * 妫€鏌ョ郴缁熶腑鏄惁瀛樺湪瓒呯骇绠＄悊鍛?
     */
    public boolean existsSuperAdmin() {
        return userRepository.existsByRole(Role.SUPERADMIN);
    }

    /**
     * 鍒濆鍖栬秴绾х鐞嗗憳锛堜粎褰撶郴缁熶腑灏氭棤瓒呯骇绠＄悊鍛樻椂鍙敤锛?
     * 绯荤粺棣栨閮ㄧ讲鏃跺繀椤诲厛璋冪敤姝ゆ帴鍙ｅ垱寤哄垵濮嬭秴绾х鐞嗗憳
     */
    public Map<String, String> initSuperAdmin(String username, String email, String password) {
        if (userRepository.existsByRole(Role.SUPERADMIN)) {
            return Map.of("message", "瓒呯骇绠＄悊鍛樺凡瀛樺湪锛屼笉鑳介噸澶嶅垵濮嬪寲");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "鐢ㄦ埛鍚嶅凡琚娇鐢?);
        }

        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "閭宸茶浣跨敤");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.SUPERADMIN);
        userRepository.save(user);

        return Map.of("message", "瓒呯骇绠＄悊鍛樺垵濮嬪寲鎴愬姛");
    }

    /**
     * 鍒嗛〉鏌ヨ鐢ㄦ埛鍒楄〃
     */
    public Page<User> listUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    /**
     * 鏍规嵁 ID 鏌ヨ鐢ㄦ埛
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * 鍒涘缓鐢ㄦ埛
     *
     * @param operatorRole 鎿嶄綔鑰呯殑瑙掕壊
     * @param username     鐢ㄦ埛鍚?
     * @param email        閭
     * @param password     瀵嗙爜
     * @param targetRole   瑕佸垱寤虹殑鐢ㄦ埛瑙掕壊
     */
    public Map<String, Object> createUser(Role operatorRole, String username,
                                          String email, String password, Role targetRole) {
        if (targetRole == null) {
            return Map.of("message", "蹇呴』鎸囧畾鐢ㄦ埛瑙掕壊");
        }

        // 瑙掕壊鏉冮檺鏍￠獙锛氬彧鏈?SUPERADMIN 鑳藉垱寤?ADMIN锛屼换浣曚汉閮戒笉鑳藉垱寤?SUPERADMIN
        if (targetRole == Role.SUPERADMIN) {
            return Map.of("message", "涓嶅厑璁哥洿鎺ュ垱寤鸿秴绾х鐞嗗憳");
        }
        if (targetRole == Role.ADMIN && operatorRole != Role.SUPERADMIN) {
            return Map.of("message", "鍙湁瓒呯骇绠＄悊鍛樻墠鑳藉垱寤虹鐞嗗憳璐﹀彿");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "鐢ㄦ埛鍚嶅凡琚娇鐢?);
        }
        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "閭宸茶浣跨敤");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(targetRole);
        userRepository.save(user);

        return Map.of("message", "鐢ㄦ埛鍒涘缓鎴愬姛", "userId", user.getId());
    }

    /**
     * 鏇存柊鐢ㄦ埛淇℃伅
     *
     * @param operatorRole 鎿嶄綔鑰呯殑瑙掕壊
     * @param operatorId   鎿嶄綔鑰呯殑鐢ㄦ埛 ID锛堢敤浜庤嚜鎿嶄綔鏍￠獙锛?
     * @param id           鐩爣鐢ㄦ埛 ID
     * @param username     鏂扮敤鎴峰悕锛坣ull 琛ㄧず涓嶄慨鏀癸級
     * @param email        鏂伴偖绠憋紙null 琛ㄧず涓嶄慨鏀癸級
     * @param role         鏂拌鑹诧紙null 琛ㄧず涓嶄慨鏀癸級
     */
    public Map<String, String> updateUser(Role operatorRole, Long operatorId,
                                          Long id, String username, String email, Role role) {
        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return Map.of("message", "鐢ㄦ埛涓嶅瓨鍦?);
        }

        // 鏍￠獙鎿嶄綔鑰呮槸鍚︽湁鏉冪鐞嗙洰鏍囩敤鎴凤紙鍩轰簬鐩爣褰撳墠瑙掕壊锛?
        String error = validateOperation(operatorRole, target.getRole());
        if (error != null) {
            return Map.of("message", error);
        }

        // 鏍￠獙瑙掕壊鍙樻洿鏉冮檺
        if (role != null && role != target.getRole()) {
            if (role == Role.SUPERADMIN && operatorRole != Role.SUPERADMIN) {
                return Map.of("message", "鏃犳潈灏嗙敤鎴锋彁鍗囦负瓒呯骇绠＄悊鍛?);
            }
            if (role == Role.ADMIN && operatorRole != Role.SUPERADMIN) {
                return Map.of("message", "鍙湁瓒呯骇绠＄悊鍛樻墠鑳藉皢鐢ㄦ埛璁句负绠＄悊鍛?);
            }
            target.setRole(role);
        }

        if (username != null && !username.equals(target.getUsername())) {
            if (userRepository.findByUsername(username).isPresent()) {
                return Map.of("message", "鐢ㄦ埛鍚嶅凡琚娇鐢?);
            }
            target.setUsername(username);
        }

        if (email != null && !email.equals(target.getEmail())) {
            if (userRepository.existsByEmail(email)) {
                return Map.of("message", "閭宸茶浣跨敤");
            }
            target.setEmail(email);
        }

        userRepository.save(target);
        return Map.of("message", "鐢ㄦ埛淇℃伅鏇存柊鎴愬姛");
    }

    /**
     * 鍒犻櫎鐢ㄦ埛
     *
     * @param operatorRole 鎿嶄綔鑰呯殑瑙掕壊
     * @param operatorId   鎿嶄綔鑰呯殑鐢ㄦ埛 ID锛堢敤浜庤嚜鎿嶄綔鏍￠獙锛?
     * @param id           鐩爣鐢ㄦ埛 ID
     */
    @Transactional
    public Map<String, String> deleteUser(Role operatorRole, Long operatorId, Long id) {
        // 绂佹鍒犻櫎鑷繁
        if (operatorId.equals(id)) {
            return Map.of("message", "涓嶈兘鍒犻櫎鑷繁鐨勮处鍙?);
        }

        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return Map.of("message", "鐢ㄦ埛涓嶅瓨鍦?);
        }

        // 鏍￠獙鎿嶄綔鑰呮槸鍚︽湁鏉冪鐞嗙洰鏍囩敤鎴?
        String error = validateOperation(operatorRole, target.getRole());
        if (error != null) {
            return Map.of("message", error);
        }

        // 绂佹鍒犻櫎鏈€鍚庝竴涓秴绾х鐞嗗憳
        if (target.getRole() == Role.SUPERADMIN && userRepository.countByRole(Role.SUPERADMIN) <= 1) {
            return Map.of("message", "绯荤粺蹇呴』鑷冲皯淇濈暀涓€涓秴绾х鐞嗗憳");
        }

        userRepository.delete(target);
        return Map.of("message", "鐢ㄦ埛鍒犻櫎鎴愬姛");
    }

    /**
     * 璁垮鑷姪娉ㄥ唽
     * 娉ㄥ唽鍚庤嚜鍔ㄨ幏寰?GUEST 瑙掕壊锛屾嫢鏈夊彧璇绘潈闄?
     */
    public Map<String, String> registerGuest(String username, String email, String password) {
        // 璁垮娉ㄥ唽闇€瑕佺郴缁熷凡鏈夎秴绾х鐞嗗憳
        if (!userRepository.existsByRole(Role.SUPERADMIN)) {
            return Map.of("message", "绯荤粺灏氭湭鍒濆鍖栵紝鏃犳硶娉ㄥ唽");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            return Map.of("message", "鐢ㄦ埛鍚嶅凡琚娇鐢?);
        }

        if (userRepository.existsByEmail(email)) {
            return Map.of("message", "閭宸茶浣跨敤");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(Role.GUEST);
        userRepository.save(user);

        return Map.of("message", "璁垮娉ㄥ唽鎴愬姛锛岃鐧诲綍");
    }

    /**
     * 鏍￠獙鎿嶄綔鑰呮槸鍚︽湁鏉冩搷浣滅洰鏍囩敤鎴?
     * 瑙勫垯锛歋UPERADMIN > ADMIN > USER > GUEST
     *
     * @param operatorRole 鎿嶄綔鑰呰鑹?
     * @param targetRole   鐩爣鐢ㄦ埛褰撳墠瑙掕壊
     * @return 濡傛灉鏃犳潈鎿嶄綔杩斿洖閿欒淇℃伅锛屽惁鍒欒繑鍥?null
     */
    private String validateOperation(Role operatorRole, Role targetRole) {
        if (operatorRole == Role.SUPERADMIN) {
            return null; // 瓒呯骇绠＄悊鍛樺彲浠ユ搷浣滀换浣曚汉
        }
        if (operatorRole == Role.ADMIN) {
            // 绠＄悊鍛樹笉鑳芥搷浣滆秴绾х鐞嗗憳鍜屽叾浠栫鐞嗗憳
            if (targetRole == Role.SUPERADMIN || targetRole == Role.ADMIN) {
                return "鏃犳潈鎿嶄綔瓒呯骇绠＄悊鍛樻垨鍏朵粬绠＄悊鍛?;
            }
            return null;
        }
        // 鏅€氱敤鎴峰拰璁垮鏃犳潈绠＄悊
        return "鏃犳搷浣滄潈闄?;
    }

    /**
     * 修改当前用户密码
     * @param userId      用户 ID
     * @param oldPassword 原密码
     * @param newPassword 新密码
     * @return 成功或错误信息
     */
    public Map<String, String> changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return Map.of("message", "用户不存在");
        }
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return Map.of("message", "原密码不正确");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return Map.of("message", "密码修改成功");
    }

    /**
     * 妫€鏌ョ敤鎴峰悕鏄惁宸茶浣跨敤
     * @param username 瑕佹鏌ョ殑鐢ㄦ埛鍚?
     * @return true 琛ㄧず宸茶浣跨敤锛宖alse 琛ㄧず鍙敤
     */
    public boolean isUsernameTaken(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}