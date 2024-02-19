import axios from "axios";
import { baseURL } from "./config";
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
    function (config: any) {
        // 在发送请求之前做些什么
        config.headers["Content-Type"] = "application/json;charset=utf-8";
        return config;
    },
    function (error: any) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);
//响应拦截器
axios.interceptors.response.use(
    function (response: any) {
        return response;
    },
    function (error: any) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
export default axios;
