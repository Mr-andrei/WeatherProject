import {ChangeEvent, useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import {useDispatch, useSelector} from "react-redux";
import {WeatherStateType, weatherTC} from "../../../m2-bll/weatherReducer";
import {MainWeatherType} from "../../../m2-bll/store";
import {fromKelvinToCelsius} from "../../../m4-functions/generalFunctionTemperatur";
import {getIcons} from "../../../m4-functions/getIcons";
import sunnyIcon from "./../../../../picture/sunny-icon.png"


export const Main = () => {
    const dispatch = useDispatch()
    const [valueInput, SetValueInput] = useState<string>("")

    const weathers = useSelector<MainWeatherType, WeatherStateType[]>(state => state.weather.mainData)
    const filterWeathers = weathers.filter(w => w.dt_txt.includes("15:00:00") )

    const valuetext = useDebounce(valueInput, 1000);

    useEffect(()=>{
        if(valuetext[0] !== ""){
        dispatch(weatherTC(valuetext[0]))}
    },[valuetext[0]])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        SetValueInput(e.currentTarget.value)
    }


    const onClickHandler = () => {

    }
    console.log(filterWeathers)
    return (
        <div>
            <input onChange={onChangeHandler} type="text"/>



            <button onClick={onClickHandler}>push</button>

            <div>
                {filterWeathers.map((w, i) =>{
                   return <div style={{display:"flex"}}>
                    <div style={{border:"1px solid black", }}>
                        <div>
                            <img src={getIcons (w.weather[0].main, w.weather[0].description)} alt="weather"/>

                        </div>
                        <span> temp day: {w.sys.pod === "d" && fromKelvinToCelsius(w.main.temp)}</span>
                        <span> feels like: {w.sys.pod === "d" && fromKelvinToCelsius(w.main.feels_like)}</span>



                    </div>
                </div>})}
            </div>
        </div>
    )
}


