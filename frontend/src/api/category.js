import request from "@/lib/axios";
import { API_ROUTES } from "@/constants";

export const categoryApi = {
  getCategories: () => request.get(API_ROUTES.CATEGORY.GET),
  createCategory: (data) => request.post(API_ROUTES.CATEGORY.CREATE, data),
  updateCategory: (data) => request.put(API_ROUTES.CATEGORY.UPDATE, data),
  deleteCategories: (data) =>
    request.delete(API_ROUTES.CATEGORY.DELETE, {
      data: Array.isArray(data) ? data : [data],
    }),
};
