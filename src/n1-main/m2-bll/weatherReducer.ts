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
    ]
}


export const weatherReducer = (state = initialWeatherState, action: ActionsType): InitialAuthStateType => {
    switch (action.type) {
        case "GET_WEATHER_TYPE":
            return {...state, mainData: action.data}
        default :
            return {...state}
    }
}

const getWeather = (data: WeatherStateType[]) => ({type: "GET_WEATHER_TYPE", data})

export const weatherTC = (city: string) => async (dispatch: Dispatch<DispatchType>) => {

    try {
        let res = await weatherApi.getWeather(city)
        // console.log(res.data.list)
         dispatch(getWeather(res.data.list))
    } catch (e: any) {
        console.log(e)
    }
}


type DispatchType = ActionsType
type ActionsType = ReturnType<typeof getWeather>

export type InitialAuthStateType = typeof initialWeatherState;