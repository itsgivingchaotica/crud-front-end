import { createStore, applyMiddleware } from "redux"
import axios from 'axios'
import rootReducer from "./rootReducer"
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const store = createStore(
    rootReducer, //reducers
    {}, //default state
    applyMiddleware(thunk.withExtraArgument({axios}),logger)
)