import axios from "axios";
import env from "../env-config";
import { message } from "antd";
import { updateIsLoading } from "../../app/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

/* singleton instance */
const axiosService = (function () {
  let instance;
  const createInstance = () => {
    let ax = axios.create({
      withCredentials: true,
      baseURL: env.serviceUrl,
    });
    return ax;
  };
  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

/* Creating a custom hook for on-demand based server calls, 
this custom hook returns axios instance and called on your requirement */
const useAxios = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = axiosService.getInstance();

  axios.interceptors.request.use(
    (config) => {
      /* customconfig-XXX: no sense to axios but useful to us.
       We are appending custom configs with "customconfig-" & passed while making a server call, 
       to have business logic while request interceptor
       usage: spinner isn't neccessary for background/sealth server calls  */
      if (!config["customconfig-hideSpinner"]) {
        dispatch(updateIsLoading(true));
      }

      const newConfig = {
        ...config,
        headers: {
          "Content-Type": "application/json",
          ...config?.headers,
        },
      };
      return newConfig;
    },
    (error) => {
      dispatch(updateIsLoading(false));
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      dispatch(updateIsLoading(false));
      return response;
    },
    (error) => {
      dispatch(updateIsLoading(false));
      const status = error?.response?.status,
        errorMessage = error?.response?.data?.message;
      console.error("Server Error:", errorMessage);

      // Global server errors 401,403 are handled here
      if (status === 401) {
        navigate("login");
        return Promise.reject(error);
      }

      if (status === 403) {
        return Promise.reject(
          message.error("You don't have required access", 6)
        );
      }

      // custom server error taken care by client side axios catch
      return Promise.reject(error);
    }
  );

  return {
    axiosGet: ({ url, config }) => axios.get(url, config),
    axiosPost: ({ url, data, config }) => axios.post(url, data, config),
    axiosPatch: ({ url, data, config }) => axios.patch(url, data, config),
    axiosDelete: ({ url, data, config }) => axios.delete(url, data, config),
  };
};

export default useAxios;
