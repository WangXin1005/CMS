import { L as request } from "./request-D_zzMMA3.js";
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
export {
  useMedia as u
};
//# sourceMappingURL=useMedia-S7mC4FFe.js.map
