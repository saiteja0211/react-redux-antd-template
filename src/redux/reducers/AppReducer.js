import Cookies from "js-cookie";
import {
  UPDATE_COUNTRY_IP_DETAILS,
  CLEAR_BREAD_CRUMBS,
  UPDATE_BREAD_CRUMBS,
  UPDATE_CATEGORIES_FETCHED_DATA,
  UPDATE_IS_SPINNING,
  UPDATE_IS_LOGGED_IN,
  UPDATE_USER_COOKIE,
  UPDATE_SHOW_LOGIN_MODAL,
  UPDATE_FORM_ALERT_MESSAGE,
  UPDATE_SHOW_MENU_DRAWER,
  UPDATE_SAME_SEARCHQUERY,
  UPDATE_GLOBAL_MODAL,
  UPDATE_IP_INFO,
  UPDATE_SUPPORTED_COUNTRIES,
} from "../constants";

const initialState = {
  isSpinning: false,
  countryCode: 356,
  countryName: "India",
  countryCurrencySymbol: "₹",
  countryCurrencyCode: "INR",
  countryCurrencyName: "Rupees",
  supportedCountries: [],
  ipInfo: {},
  bCrumbs: [],
  fetchedCategories: [],
  isLoggedIn: !!Cookies.get("individualId"),
  firstName: Cookies.get("firstName"),
  userName: Cookies.get("userName"),
  individualId: Cookies.get("individualId"),
  showLoginModal: false,
  formAlertMessage: "",
  showMenuDrawer: false,
  sameSearchQuery: false,
  globalModalVisibility: false,
  globalModalTitle: "",
  globalModalFooter: "",
  globalModalContent: <div></div>,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COUNTRY_IP_DETAILS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CLEAR_BREAD_CRUMBS: {
      return { ...state, bCrumbs: [] };
    }
    case UPDATE_BREAD_CRUMBS: {
      return { ...state, bCrumbs: action.payload };
    }

    case UPDATE_IS_SPINNING: {
      return { ...state, isSpinning: action.payload };
    }
    case UPDATE_CATEGORIES_FETCHED_DATA: {
      return { ...state, fetchedCategories: action.payload };
    }
    case UPDATE_IS_LOGGED_IN: {
      const isLoggedIn = action.payload;
      if (!isLoggedIn) {
        Cookies.remove("firstName");
        Cookies.remove("userName");
        Cookies.remove("individualId");
      }
      return { ...state, isLoggedIn };
    }
    case UPDATE_USER_COOKIE: {
      return { ...state, ...action.payload };
    }
    case UPDATE_FORM_ALERT_MESSAGE: {
      return { ...state, formAlertMessage: action.payload };
    }
    case UPDATE_SHOW_LOGIN_MODAL: {
      return { ...state, ...action.payload };
    }
    case UPDATE_SHOW_MENU_DRAWER: {
      return { ...state, showMenuDrawer: action.payload };
    }
    case UPDATE_SAME_SEARCHQUERY: {
      return { ...state, sameSearchQuery: action.payload };
    }
    case UPDATE_GLOBAL_MODAL: {
      return { ...state, ...action.payload };
    }
    case UPDATE_IP_INFO: {
      return { ...state, ipInfo: action.payload };
    }

    case UPDATE_SUPPORTED_COUNTRIES: {
      return { ...state, supportedCountries: action.payload };
    }

    default:
      return state;
  }
};

export default AppReducer;
