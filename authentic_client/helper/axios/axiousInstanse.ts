import { getNewAccessToken } from '../../services/action/authServices';


import { authKey } from "@/constant/authKey";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorages";
import axios from "axios";
import { setAccessToken } from "@/services/action/setAccessToken";

const instance = axios.create({});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 6000;
// add request interceptors
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    console.log(accessToken, "my token");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// add response instance

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("error from instance", error);
    const config = error.config;
    if (error?.response?.status === 500 && !config.sent) {
      config.sent = true;
      const response = await getNewAccessToken();
      console.log("from instance response", { response });
      const accessToken = response.data.data;
      config.headers["Authorization"] = accessToken;
      setToLocalStorage(authKey, accessToken);
      await setAccessToken(accessToken);
      return instance(config);
    } else {
      const responseObject = {
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || "Something went wrong!!!",
        errorMessage: error?.response?.data?.message,
      };
      return responseObject;
    }
  },
);
export { instance };
