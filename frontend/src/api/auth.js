import request from "@/lib/axios";
import {API_ROUTES} from "@/constants";

export const authApi = {
    register: (data) => request.post(API_ROUTES.AUTH.REGISTER, data),
    login: (data) => request.post(API_ROUTES.AUTH.LOGIN, data),
};
