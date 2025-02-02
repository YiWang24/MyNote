import request from "@/lib/axios";
import { API_ROUTES } from "@/constants";

export const noteApi = {
  create: (data) => request.post(API_ROUTES.NOTE.CREATE, data),
  get: (params) =>
    request.get(`${API_ROUTES.NOTE.GET}?${new URLSearchParams(params)}`),
  update: (id, data) => request.put(API_ROUTES.NOTE.UPDATE(id), data),
  delete: (id) => request.delete(API_ROUTES.NOTE.DELETE(id)),
  updateState: (id) => request.patch(API_ROUTES.NOTE.UPDATE_STATE(id)),
};
