const devBaseURL = "//www.resoudaquan.cn";
const proBaseURL = "//www.resoudaquan.cn";
export const baseURL = process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
