import {weatherReducer} from "./weatherReducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";


const rootReducer = combineReducers( {
    weather:weatherReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type MainWeatherType = ReturnType<typeof rootReducer>