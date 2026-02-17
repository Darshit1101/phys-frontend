const prefix = "/v1";
const apiList = {
  AUTH: {
    LOGIN: {
      method: "POST",
      url: `${prefix}/auth/login-user`,
    },
    REGISTER: {
      method: "POST",
      url: `${prefix}/auth/create-user`,
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
    LIST: {
      method: "GET",
      url: `${prefix}/appointment/list`,
    },
  },
  ADDRESS: {
    CREATE: {
      method: "POST",
      url: `${prefix}/address/create`,
    },
    LIST: {
      method: "GET",
      url: `${prefix}/address/getAll`,
    },
    UPDATE: {
      method: "PUT",
      url: `${prefix}/address/update`,
    },
    DELETE: {
      method: "DELETE",
      url: `${prefix}/address/delete`,
    },
    SET_DEFAULT: {
      method: "PATCH",
      url: `${prefix}/address/setDefault`,
    },
  },
  SYNC: {
    GET: {
      method: "GET",
      url: `${prefix}/sync/getSync`,
    },
  },
  PROFILE: {
    GET: {
      method: "GET",
      url: `${prefix}/profile/get`,
    },
    SAVE: {
      method: "POST",
      url: `${prefix}/profile/save`,
    },
  },
};

export default apiList;
