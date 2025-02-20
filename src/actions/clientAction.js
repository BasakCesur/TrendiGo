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

// ✅ Verify Token (Auto Login)
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) return; // Eğer token yoksa çık

  try {
    // ✅ Token'ı Axios Header'a ekle
    api.defaults.headers.common["Authorization"] = token; // NOT: Bearer eklemiyoruz!

    // ✅ API'ye /verify isteği yap
    const response = await api.get("/verify");
    const userData = response.data;

    // ✅ Kullanıcıyı Redux Store'a kaydet
    dispatch(setUser(userData));

    // ✅ Token'ı yenileyerek tekrar localStorage'a kaydet
    localStorage.setItem("token", userData.token);
    api.defaults.headers.common["Authorization"] = userData.token;

    console.log("Auto Login Successful:", userData);
  } catch (error) {
    console.error("Auto login failed, token expired or invalid:", error);

    // ❌ Token geçersizse temizle
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

export const logoutUser = () => (dispatch) => {
  // ✅ LocalStorage'dan token ve kullanıcı bilgilerini temizle
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // ✅ Axios Header'dan Authorization'ı kaldır
  delete api.defaults.headers.common["Authorization"];

  // ✅ Redux store'dan kullanıcı bilgisini temizle
  dispatch({ type: "SET_USER", payload: {} }); // 🚀 user null yerine boş nesne olmalı!
};
