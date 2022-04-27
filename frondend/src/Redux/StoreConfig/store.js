// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk"
import createDebounce from "redux-debounced"
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducers } from "../../Components/Reducers/index"

// ** init middleware
const middleware = [thunk, createDebounce()]

const rootReducer = {
    ...reducers
}

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(combineReducers(rootReducer), {}, composeEnhancers(applyMiddleware(...middleware)))

export { store }
