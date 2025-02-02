export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    INFO: "/auth/info",
  },
  NOTE: {
    CREATE: "/notes",
    GET: "/notes",
    UPDATE: (id) => `/notes/${id}`,
    DELETE: (id) => `/notes/${id}`,
    UPDATE_STATE: (id) => `/notes/${id}`,
  },
  CATEGORY: {
    CREATE: "/categories",
    GET: "/categories",
    UPDATE: (id) => `/categories/${id}`,
    DELETE: "/categories",
  },
};
