import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { createLogger } from "redux-logger";
import RootReducer from "./reducers/RootReducer";

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }

  const logger = createLogger({ collapsed: true });
  middleware.push(logger);
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(
  RootReducer(history),
  initialState,
  composedEnhancers
);
