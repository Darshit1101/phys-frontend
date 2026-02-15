const prefix = "/v1";
const apiList = {
  AUTH: {
    LOGIN: {
      method: "POST",
      url: `${prefix}/auth/login-user`,
    },
    LOGOUT: {
      method: "POST",
      url: `${prefix}/auth/logout-user`,
    },
    UPDATE_PROFILE: {
      method: "PUT",
      url: `${prefix}/auth/edit`,
    },
    FORGOT_PASSWORD: {
      method: "POST",
      url: `${prefix}/auth/forgot-password`,
    },
    RESET_PASSWORD: {
      method: "POST",
      url: `${prefix}/auth/reset-password`,
    },
  },
  USERS:{
    GET_ALL: {
      method: "POST",
      url: `${prefix}/user/getAllUsers`,
    },
  },
  APPOINTMENT: {
    BOOK: {
      method: "POST",
      url: `${prefix}/appointment/book`,
    },
  },
};

export default apiList;
