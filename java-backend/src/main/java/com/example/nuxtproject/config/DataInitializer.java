package com.example.nuxtproject.config;

import com.example.nuxtproject.entity.*;
import com.example.nuxtproject.entity.Article.ArticleStatus;
import com.example.nuxtproject.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * 数据初始化器
 * 首次启动时自动创建示例数据：管理员、分类、标签和文章
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ArticleRepository articleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           CategoryRepository categoryRepository,
                           TagRepository tagRepository,
                           ArticleRepository articleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.articleRepository = articleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // 已有数据则跳过初始化
        if (articleRepository.count() > 0) {
            return;
        }

        System.out.println("========================================");
        System.out.println("  数据初始化开始...");
        System.out.println("========================================");

        // 1. 创建管理员（如果不存在）
        User admin = userRepository.findByUsernameOrEmail("admin").orElse(null);
        if (admin == null) {
            admin = userRepository.save(new User(
                    "admin",
                    "admin@example.com",
                    passwordEncoder.encode("admin123"),
                    Role.SUPERADMIN
            ));
            System.out.println("  ✓ 管理员账号已创建: admin / admin123");
        }

        // 3. 创建标签
        if (tagRepository.count() == 0) {
            tagRepository.saveAll(List.of(
                    new Tag("Java", "java"),
                    new Tag("Vue.js", "vuejs"),
                    new Tag("Nuxt", "nuxt"),
                    new Tag("前端开发", "frontend"),
                    new Tag("后端开发", "backend")
            ));
            System.out.println("  ✓ 标签已创建: Java, Vue.js, Nuxt, 前端开发, 后端开发");
        }

        // 4. 创建示例文章
        if (articleRepository.count() == 0) {
            Category techCat = categoryRepository.findBySlug("tech").orElse(null);
            Category lifeCat = categoryRepository.findBySlug("life").orElse(null);
            Category notesCat = categoryRepository.findBySlug("notes").orElse(null);

            Tag javaTag = tagRepository.findBySlug("java").orElse(null);
            Tag vueTag = tagRepository.findBySlug("vuejs").orElse(null);
            Tag nuxtTag = tagRepository.findBySlug("nuxt").orElse(null);
            Tag frontendTag = tagRepository.findBySlug("frontend").orElse(null);
            Tag backendTag = tagRepository.findBySlug("backend").orElse(null);

            // 文章1: Spring Boot 入门
            Article article1 = new Article(
                    "Spring Boot 3 快速入门指南",
                    "spring-boot-quick-start",
                    admin,
                    ArticleStatus.PUBLISHED
            );
                        article1.setContent("""
<h2>什么是 Spring Boot？</h2>
<p>Spring Boot 是 Spring 框架的一个模块，旨在简化 Spring 应用的初始搭建和开发过程。它通过提供默认配置和自动化配置，让开发者能够快速创建独立运行的、生产级的 Spring 应用。</p>
<h2>核心特性</h2>
<ul>
<li><strong>自动配置</strong>：根据依赖自动配置 Spring 应用</li>
<li><strong>起步依赖</strong>：简化 Maven/Gradle 配置</li>
<li><strong>嵌入式服务器</strong>：内嵌 Tomcat、Jetty 等</li>
<li><strong>Actuator</strong>：提供生产级监控功能</li>
</ul>
<h2>快速开始</h2>
<h3>1. 创建项目</h3>
<p>使用 Spring Initializr 或 IDE 创建项目，选择以下依赖：</p>
<pre><code>Spring Web
Spring Data JPA
MySQL Driver
Lombok</code></pre>
<h3>2. 配置文件</h3>
<pre><code>spring.datasource.url=jdbc:mysql://localhost:3306/demo
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update</code></pre>
<h3>3. 创建 REST 控制器</h3>
<pre><code>@RestController
@RequestMapping("/api/hello")
public class HelloController {
    @GetMapping
    public String sayHello() {
        return "Hello, Spring Boot 3!";
    }
}</code></pre>
<blockquote>
<p>提示：Spring Boot 3 最低要求 Java 17，建议使用 Java 21 以获得更好的性能。</p>
</blockquote>
<h2>总结</h2>
<p>Spring Boot 凭借其约定优于配置的理念，已经成为 Java 后端开发的首选框架。配合 JPA、Security 等模块，可以快速构建健壮的企业级应用。</p>
""");
            article1.setSummary("Spring Boot 3 的新特性与快速入门教程，带你从零开始构建第一个 REST API。");
            article1.setViewCount(128L);
            if (techCat != null) article1.setCategory(techCat);
            if (javaTag != null && backendTag != null)
                article1.setTags(Set.of(javaTag, backendTag));

            // 文章2: Vue 3 组合式 API 详解
            Article article2 = new Article(
                    "Vue 3 组合式 API 实战详解",
                    "vue3-composition-api-guide",
                    admin,
                    ArticleStatus.PUBLISHED
            );
                        article2.setContent("""
<h2>为什么选择组合式 API？</h2>
<p>Vue 3 引入的组合式 API（Composition API）解决了选项式 API 在复杂组件中的逻辑复用和代码组织问题。</p>
<h2>核心概念</h2>
<h3>ref 和 reactive</h3>
<pre><code>import { ref, reactive } from 'vue'

const count = ref(0)
const state = reactive({
  name: 'Vue 3',
  version: 3
})</code></pre>
<h3>computed 和 watch</h3>
<pre><code>const doubled = computed(() => count.value * 2)

watch(count, (newVal, oldVal) => {
  console.log(`count from ${newVal} to ${oldVal}`)
})</code></pre>
<h3>生命周期</h3>
<pre><code>onMounted(() => {
  console.log('Component mounted')
})
onUnmounted(() => {
  console.log('Component unmounted')
})</code></pre>
<h2>实际应用示例</h2>
<pre><code>export function useSearch(api) {
  const results = ref([])
  const loading = ref(false)
  const search = async (keyword) => {
    loading.value = true
    try {
      results.value = await api.search(keyword)
    } finally {
      loading.value = false
    }
  }
  return { results, loading, search }
}</code></pre>
<blockquote>
<p>组合式 API 让逻辑复用变得前所未有的简单。</p>
</blockquote>
""");
            article2.setSummary("深入理解 Vue 3 组合式 API 的核心概念，包含 ref、reactive、computed 和自定义 Hook 实战。");
            article2.setViewCount(256L);
            if (techCat != null) article2.setCategory(techCat);
            if (vueTag != null && frontendTag != null && nuxtTag != null)
                article2.setTags(Set.of(vueTag, frontendTag, nuxtTag));

            // 文章3: 程序员的生活之道
            Article article3 = new Article(
                    "我的编程之旅：从入门到热爱",
                    "my-programming-journey",
                    admin,
                    ArticleStatus.PUBLISHED
            );
                        article3.setContent("""
<h2>起点</h2>
<p>还记得第一次写下 <code>Hello, World!</code> 时的兴奋心情。那时的我，完全没想到编程会成为我热爱的事业。</p>
<h2>学习之路</h2>
<p>编程学习没有捷径，但有方法：</p>
<ol>
<li><strong>打好基础</strong>：数据结构与算法是程序员的必修课</li>
<li><strong>动手实践</strong>：光看不练永远学不会编程</li>
<li><strong>阅读源码</strong>：向优秀的开源项目学习</li>
<li><strong>持续输出</strong>：写作是最好的学习方式</li>
</ol>
<h2>一些感悟</h2>
<blockquote>
<p>任何傻瓜都能写出计算机能理解的代码，优秀的程序员能写出人类能理解的代码。 — Martin Fowler</p>
</blockquote>
<p>编程不仅是编写代码，更是解决问题的艺术。</p>
<h2>给新手的建议</h2>
<ul>
<li>不要害怕犯错，每个错误都是学习机会</li>
<li>培养阅读文档的习惯</li>
<li>参与开源社区，学习他人的代码</li>
<li>找到自己感兴趣的领域深入研究</li>
<li>保持好奇心，技术世界日新月异</li>
</ul>
<p>希望这篇文章能激励更多的人走上编程之路，享受创造的乐趣。</p>
""");
            article3.setSummary("一个程序员的自述：从初学编程到热爱技术的成长故事，以及给编程新手的实用建议。");
            article3.setViewCount(89L);
            article3.setCoverImage("https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800");
            if (lifeCat != null) article3.setCategory(lifeCat);
            if (notesCat != null) article3.setCategory(notesCat);
            if (frontendTag != null && backendTag != null)
                article3.setTags(Set.of(frontendTag, backendTag));

            articleRepository.saveAll(List.of(article1, article2, article3));
            System.out.println("  ✓ 示例文章已创建（3篇）");
        }

        System.out.println("========================================");
        System.out.println("  数据初始化完成！");
        System.out.println("  管理员: admin / admin123");
        System.out.println("========================================");
    }
}
