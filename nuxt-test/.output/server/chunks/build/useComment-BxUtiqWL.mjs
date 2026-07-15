import { f as request } from './request-BADReGqm.mjs';

const useComment = () => {
  const getArticleComments = async (articleId) => {
    const res = await request.get(`/comments/article/${articleId}`);
    return res.data;
  };
  const submit = async (data) => {
    const res = await request.post("/comments", data);
    return res.data;
  };
  const getAdminList = async (page = 1, size = 20, status) => {
    const params = { page, size };
    if (status) params.status = status;
    const res = await request.get("/admin/comments", { params });
    return res.data;
  };
  const approve = async (id) => {
    const res = await request.put(`/admin/comments/${id}/approve`);
    return res.data;
  };
  const reject = async (id) => {
    const res = await request.put(`/admin/comments/${id}/reject`);
    return res.data;
  };
  const remove = async (id) => {
    const res = await request.delete(`/admin/comments/${id}`);
    return res.data;
  };
  const getStats = async () => {
    const res = await request.get("/admin/comments/stats");
    return res.data;
  };
  return { getArticleComments, submit, getAdminList, approve, reject, remove, getStats };
};

export { useComment as u };
//# sourceMappingURL=useComment-BxUtiqWL.mjs.map
