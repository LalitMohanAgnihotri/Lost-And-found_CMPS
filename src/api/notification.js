import axios from "./axios";

export const getNotifications = async () => {
  const res = await axios.get("/notifications");
  return res.data;
};

export const markAllRead = async () => {
  try {
    await axios.put("/notifications/read");
  } catch (err) {
    console.log("markAllRead failed (safe ignore)", err.message);
  }
};