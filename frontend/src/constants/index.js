export const API_ROUTES = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
  },
  NOTE: {
    CREATE: "/notes",
    GET: "/notes",
    UPDATE: (id) => `/notes/${id}`,
    DELETE: (id) => `/notes/${id}`,
  },
  CATEGORY:{
    CREATE: "/categories",
    GET: "/categories",
    UPDATE: (id) => `/categories/${id}`,
    DELETE:"/categories"
  }
};
