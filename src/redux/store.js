import { createStore, applyMiddleware } from "redux"
import axios from 'axios'
import rootReducer from "./rootReducer"
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension';

export const store = createStore(
    rootReducer, //reducers
    {}, //default state
    // applyMiddleware(thunk.withExtraArgument({axios}),logger)
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument({axios}), logger))
)