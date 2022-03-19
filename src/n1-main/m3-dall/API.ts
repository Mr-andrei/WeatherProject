import axios from "axios";


const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/`,

})

export const weatherApi = {
    getWeather(city:string){
       return  instance.get(`forecast?q=${city}&appid=8b8876301e769c19c86f566d394bad14`)
    }
}

export type WeatherType = {
    dt_txt: string
    list: [
        {
            main:MainWeather
            weather:WeatherNowType[]
            wind: {
                "speed": number,
            }
        }
        ]
}

type MainWeather = {
    "temp": number
    "feels_like": number
    "temp_min": number
    "temp_max": number
}

type WeatherNowType ={
    "main": String
    "description": String
    "icon": String
}