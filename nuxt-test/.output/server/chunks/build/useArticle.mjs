import { e as request } from './request.mjs';

const useArticle = () => {
  const getPublished = async (page = 1, size = 10, filters) => {
    const params = { page, size };
    if (filters?.categoryId) params.categoryId = filters.categoryId;
    if (filters?.tagId) params.tagId = filters.tagId;
    if (filters?.keyword) params.keyword = filters.keyword;
    const res = await request.get("/articles", { params });
    return res.data;
  };
  const getBySlug = async (slug) => {
    const res = await request.get(`/articles/${slug}`);
    return res.data;
  };
  const getStats = async () => {
    const res = await request.get("/articles/stats");
    return res.data;
  };
  const getRecent = async (page = 1, size = 5) => {
    const res = await request.get("/articles/recent", { params: { page, size } });
    return res.data;
  };
  const getMyArticles = async (page = 1, size = 20, status, keyword, categoryId, tagId) => {
    const params = { page, size };
    if (status) params.status = status;
    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    if (tagId) params.tagId = tagId;
    const res = await request.get("/articles/my", { params });
    return res.data;
  };
  const getMyArticleById = async (id) => {
    const res = await request.get(`/articles/my/${id}`);
    return res.data;
  };
  const createMyArticle = async (data) => {
    const res = await request.post("/articles/my", data);
    return res.data;
  };
  const updateMyArticle = async (id, data) => {
    const res = await request.put(`/articles/my/${id}`, data);
    return res.data;
  };
  const removeMyArticle = async (id) => {
    const res = await request.delete(`/articles/my/${id}`);
    return res.data;
  };
  const getAdminList = async (page = 1, size = 20, status, keyword, categoryId, tagId, authorId) => {
    const params = { page, size };
    if (status) params.status = status;
    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    if (tagId) params.tagId = tagId;
    if (authorId) params.authorId = authorId;
    const res = await request.get("/admin/articles", { params });
    return res.data;
  };
  const getById = async (id) => {
    const res = await request.get(`/admin/articles/${id}`);
    return res.data;
  };
  const create = async (data) => {
    const res = await request.post("/admin/articles", data);
    return res.data;
  };
  const update = async (id, data) => {
    const res = await request.put(`/admin/articles/${id}`, data);
    return res.data;
  };
  const remove = async (id) => {
    const res = await request.delete(`/admin/articles/${id}`);
    return res.data;
  };
  return {
    getPublished,
    getBySlug,
    getStats,
    getRecent,
    getMyArticles,
    getMyArticleById,
    createMyArticle,
    updateMyArticle,
    removeMyArticle,
    getAdminList,
    getById,
    create,
    update,
    remove
  };
};

export { useArticle as u };
//# sourceMappingURL=useArticle.mjs.map
