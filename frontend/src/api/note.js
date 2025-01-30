import request from "@/lib/axios";
import { API_ROUTES } from "@/constants";

export const noteApi = {
  create: async (data) => {
    const response = await request.post(API_ROUTES.NOTE.CREATE, data);
    return response;
  },
  get: async (params) => {
    const response = await request.get(API_ROUTES.NOTE.GET, { params });
    return response;
  },
  update: async (id, data) => {
    const response = await request.put(API_ROUTES.NOTE.UPDATE(id), data);
    return response;
  },
  delete: async (id) => {
    const response = await request.delete(API_ROUTES.NOTE.DELETE(id));
    return response;
  },
};
