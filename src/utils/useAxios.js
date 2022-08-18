import { message } from "antd";
import axios from "axios";
import { batch, useDispatch } from "react-redux";
import { serviceUrl } from "../constants";
import {
  updateIsLoggedIn,
  updateIsSpinning,
  updateShowLoginModal,
} from "../redux/actions/ActionCreators";
import Cookies from "js-cookie";
const useAxios = () => {
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: serviceUrl,
    "Content-Type": "application/json",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("XXX", config?.customConfig?.hideSpinner);
      if (!config?.customConfig?.hideSpinner) {
        dispatch(updateIsSpinning(true));
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
      dispatch(updateIsSpinning(false));
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      dispatch(updateIsSpinning(false));
      return response;
    },
    (error) => {
      dispatch(updateIsSpinning(false));
      const status = error?.response?.status,
        errorMessage = error?.response?.data?.message;
      console.error("Server Error:", errorMessage);

      // Global server errors 401,403 are handled here only
      if (status === 401) {
        batch(() => {
          dispatch(updateIsLoggedIn(false));
          dispatch(
            updateShowLoginModal({
              showLoginModal: true,
              formAlertMessage: "Please login to proceed",
            })
          );
        });
        Cookies.remove("userName");

        return Promise.reject(error);
      }

      if (status === 403) {
        return Promise.reject(
          message.error(`You don't have required access.`, 6)
        );
      }

      // custom server error taken care by client side axios catch
      return Promise.reject(error);
    }
  );

  return {
    axiosGet: ({ url, config }) => axiosInstance.get(url, config),
    axiosPost: ({ url, data, config }) => axiosInstance.post(url, data, config),
    axiosPatch: ({ url, data, config }) =>
      axiosInstance.patch(url, data, config),
    axiosDelete: ({ url, data, config }) =>
      axiosInstance.delete(url, data, config),
  };
};

export default useAxios;
