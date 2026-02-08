export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  // 1️⃣ Remove token
  localStorage.removeItem("token");

  // 2️⃣ (Optional) Clear other stored data
  localStorage.removeItem("user");

  // 3️⃣ Redirect to login
  window.location.replace("/login");
};
