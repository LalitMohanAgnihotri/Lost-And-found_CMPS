import api from "./axios";

export const fetchFoundItems = async () => {
  const response = await api.get("/found");
  return response.data;
};
