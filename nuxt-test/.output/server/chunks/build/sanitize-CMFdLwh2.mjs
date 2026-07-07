import DOMPurify from 'isomorphic-dompurify';

function sanitizeHtml(html) {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "del",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "div",
      "span",
      "svg",
      "path"
    ],
    ALLOWED_ATTR: [
      "href",
      "src",
      "alt",
      "title",
      "target",
      "rel",
      "class",
      "id",
      "style",
      "width",
      "height",
      "viewBox",
      "fill",
      "d",
      "colspan",
      "rowspan"
    ],
    ALLOW_DATA_ATTR: false
  });
}

export { sanitizeHtml as s };
//# sourceMappingURL=sanitize-CMFdLwh2.mjs.map
