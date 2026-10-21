import api from "../../utils/axios";

export const logOut = async () => {
  try {
    const { data } = await api.get("/api/auth/logout");
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};
