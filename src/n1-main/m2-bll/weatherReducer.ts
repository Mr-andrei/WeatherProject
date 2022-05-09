import {weatherApi} from "../m3-dall/API";
import {Dispatch} from "redux";


type WeatherType = {
    main: string
    description: string
    icon: string
}

export type WeatherStateType = {
    dt_txt: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
    }
    weather: WeatherType[]
    wind: {
        speed: number
    }
    sys: {pod: string}

}

type InitialWeatherStateType = {
    mainData: WeatherStateType[]
    errorStatus:boolean
    errorText: string
}

const initialWeatherState: InitialWeatherStateType = {
    mainData: [
        {
            dt_txt: "",
            main: {
                temp: 0,
                feels_like: 0,
                temp_min: 0,
                temp_max: 0,
            },
            weather:[ {
                main: "",
                description: "",
                icon: "",
            }],
            wind: {
                speed: 0,
            },
            sys: {pod: ''}
        }
    ],
    errorStatus:false,
    errorText:""
}


export const weatherReducer = (state = initialWeatherState, action: ActionsType): InitialWeatherStateType => {
    switch (action.type) {
        case "GET_WEATHER_TYPE":
            return {...state, mainData: action.data}
        case "SET_ERROR":{
            return {...state, errorStatus:action.error}
        }
        case "SET_ERROR_TEXT":{
            return {...state, errorText:action.errorText}
        }
        default :
            return {...state}
    }
}

const getWeather = (data: WeatherStateType[]) => ({type: "GET_WEATHER_TYPE", data} as const)
export const setError = (error:boolean) => ({type: "SET_ERROR", error}as const)
const setErrorText = (errorText:string) => ({type: "SET_ERROR_TEXT", errorText}as const)

export const weatherTC = (city: string) => async (dispatch: Dispatch<DispatchType>) => {

    try {
        let res = await weatherApi.getWeather(city)
         dispatch(getWeather(res.data.list))
    } catch (e: any) {
        dispatch(setError(true))
        dispatch(setErrorText(e.response.data.message))

    }
}


type DispatchType = ActionsType
type ActionsType = ReturnType<typeof getWeather>
    | ReturnType<typeof setError>
    | ReturnType<typeof setErrorText>

