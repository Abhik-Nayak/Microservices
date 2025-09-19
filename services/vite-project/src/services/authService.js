import api from "../api";

export const register = async (email, password) => {
  const { data } = await api.post("/register", { email, password });
  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post("/login", { email, password });
  localStorage.setItem("accessToken", data.accessToken);

  // attach token to axios instance
  api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
  return data;
};

export const logout = async () => {
  await api.post("/logout");
  localStorage.removeItem("accessToken");
};

export const getUser = async () => {
  const { data } = await api.get("/user");
  return data;
};

export const updateUser = async (payload) => {
  const { data } = await api.put("/user", payload);
  return data;
};