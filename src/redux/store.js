import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/rootReducers";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk];

if (__DEV__) {
    // this will display redux stage changes to Chrome's Console
    middlewares.push(logger)
}

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;