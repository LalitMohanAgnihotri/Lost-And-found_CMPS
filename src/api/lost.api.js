import api from "./axios";

export const fetchLostItems = async () => {
  const response = await api.get("/lost");
  return response.data;
};
export const fetchLostItemById = async (id) => {
  const res = await api.get(`/lost/${id}`);
  return res.data;
};