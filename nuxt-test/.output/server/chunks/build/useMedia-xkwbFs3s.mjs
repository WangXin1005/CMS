import { e as request } from './request-CPAxCwDy.mjs';

const useMedia = () => {
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await request.post("/admin/media/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  };
  const getList = async () => {
    const res = await request.get("/admin/media");
    return res.data;
  };
  const remove = async (id) => {
    const res = await request.delete(`/admin/media/${id}`);
    return res.data;
  };
  return { upload, getList, remove };
};

export { useMedia as u };
//# sourceMappingURL=useMedia-xkwbFs3s.mjs.map
