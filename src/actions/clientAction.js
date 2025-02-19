import api from "../data/axiosInstance";

export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const setRoles = (roles) => ({ type: "SET_ROLES", payload: roles });
export const setTheme = (theme) => ({ type: "SET_THEME", payload: theme });
export const setLanguage = (language) => ({ type: "SET_LANGUAGE", payload: language });

export const fetchRoles = () => async (dispatch, getState) => {
    if (getState().client.roles.length === 0) {
      try {
        const response = await api.get("/roles");
        dispatch(setRoles(response.data));
      } catch (error) {
        console.error("Roller alınırken hata oluştu:", error);
      }
    }
  };


  export const loginUser = (email, password, rememberMe) => async (dispatch) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    const userData = response.data;

    dispatch({ type: "SET_USER", payload: userData });

    if (rememberMe) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    return userData;
  } catch (error) {
    const errorMessage = error.response?.data || error.message;
    throw new Error(`Giriş başarısız! ${errorMessage}`);
  }
};