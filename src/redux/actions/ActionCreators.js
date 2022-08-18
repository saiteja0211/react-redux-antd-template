import {
  CLEAR_BREAD_CRUMBS,
  UPDATE_BREAD_CRUMBS,
  UPDATE_CATEGORIES_FETCHED_DATA,
  UPDATE_IS_SPINNING,
  UPDATE_IS_LOGGED_IN,
  UPDATE_USER_COOKIE,
  UPDATE_FORM_ALERT_MESSAGE,
  UPDATE_SHOW_LOGIN_MODAL,
  UPDATE_COUNTRY_IP_DETAILS,
  UPDATE_SHOW_MENU_DRAWER,
  UPDATE_SAME_SEARCHQUERY,
  UPDATE_GLOBAL_MODAL,
  UPDATE_IP_INFO,
  UPDATE_SUPPORTED_COUNTRIES,
} from "../constants";

export const updateCountryIPDetails = (data) => (dispatch) => {
  dispatch({ type: UPDATE_COUNTRY_IP_DETAILS, payload: data });
};

export const updateBreadCrumbs = (data) => (dispatch) => {
  dispatch({ type: UPDATE_BREAD_CRUMBS, payload: data });
};
export const clearBreadCrumbs = () => (dispatch) => {
  dispatch({ type: CLEAR_BREAD_CRUMBS });
};

export const updateIsSpinning = (data) => (dispatch) => {
  dispatch({ type: UPDATE_IS_SPINNING, payload: data });
};

export const updateCategoriesFetchedData = (data) => (dispatch) => {
  dispatch({ type: UPDATE_CATEGORIES_FETCHED_DATA, payload: data });
};

export const updateIsLoggedIn = (data) => (dispatch) => {
  dispatch({ type: UPDATE_IS_LOGGED_IN, payload: data });
};

export const updateUserCookie = (data) => (dispatch) => {
  dispatch({ type: UPDATE_USER_COOKIE, payload: data });
};

export const updateShowLoginModal = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SHOW_LOGIN_MODAL, payload: data });
};

export const updateFormAlertMessage = (data) => (dispatch) => {
  dispatch({ type: UPDATE_FORM_ALERT_MESSAGE, payload: data });
};
export const updateShowMenuDrawer = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SHOW_MENU_DRAWER, payload: data });
};

export const updateSameSearchQuery = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SAME_SEARCHQUERY, payload: data });
};

export const updateGlobalModal = (data) => (dispatch) => {
  dispatch({ type: UPDATE_GLOBAL_MODAL, payload: data });
};

export const updateIPInfo = (data) => (dispatch) => {
  dispatch({ type: UPDATE_IP_INFO, payload: data });
};

export const updateSupportedCountries = (data) => (dispatch) => {
  dispatch({ type: UPDATE_SUPPORTED_COUNTRIES, payload: data });
};
