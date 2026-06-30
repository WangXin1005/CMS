/**
 * HTML 消毒工具 — 基于 DOMPurify 防止 XSS 攻击
 * 在 v-html 渲染前调用，自动移除危险标签和事件处理器
 */
import DOMPurify from 'dompurify'

/**
 * 对 HTML 字符串进行安全消毒
 * 仅放行安全标签和属性
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  if (typeof window !== 'undefined') {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'hr',
        'ul',
        'ol',
        'li',
        'blockquote',
        'pre',
        'code',
        'strong',
        'b',
        'em',
        'i',
        'u',
        's',
        'del',
        'a',
        'img',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'div',
        'span',
        'svg',
        'path',
      ],
      ALLOWED_ATTR: [
        'href',
        'src',
        'alt',
        'title',
        'target',
        'rel',
        'class',
        'id',
        'style',
        'width',
        'height',
        'viewBox',
        'fill',
        'd',
        'colspan',
        'rowspan',
      ],
      ALLOW_DATA_ATTR: false,
    })
  }
  return html
}
