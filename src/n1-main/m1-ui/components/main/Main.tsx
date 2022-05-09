import style from "./main.module.css"
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {WeatherStateType, weatherTC} from "../../../m2-bll/weatherReducer";
import {MainWeatherType} from "../../../m2-bll/store";
import {fromKelvinToCelsius} from "../../../m4-functions/generalFunctionTemperatur";
import {getIcons} from "../../../m4-functions/getIcons";
import {getWeekDay} from "../../../m4-functions/gettingDayOfTheWeek";
import searchIcon from "./../../../../picture/searchInput.svg"
import {ErrorWindow} from "../errWindow/ErrorWindow";


export const Main = () => {
    const dispatch = useDispatch()
    const [valueInput, SetValueInput] = useState<string>("")


    const weathers = useSelector<MainWeatherType, WeatherStateType[]>(state => state.weather.mainData)
    const errorStatus = useSelector<MainWeatherType, boolean >(state => state.weather.errorStatus)
    const errorText = useSelector<MainWeatherType, string >(state => state.weather.errorText)
    const filterWeathers = weathers.filter(w => w.dt_txt.includes("15:00:00"))


    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            dispatch(weatherTC(valueInput))
            SetValueInput("")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        SetValueInput(e.currentTarget.value)
    }

    return (
        <div className={style.container}>
            <h1>Check your weather</h1>

            <div className={style.block_input}>
                <div className={style.search_icon_block}>
                    <img src={searchIcon} alt=""/>
                </div>
                <input
                    value={valueInput}
                    onKeyPress={keyPressHandler}
                    placeholder={"Search your city"}
                    className={style.input}
                    onChange={onChangeHandler}
                    type="text"/>
            </div>
            <div className={style.container_blocks}>
                {filterWeathers.map((w, i) => {
                    return <div key={i} className={style.block}>
                        <div className={style.block_weather}>
                            <div className={style.block_day}>
                                <span>{new Date(w.dt_txt).toLocaleDateString()}</span>
                                <span>{getWeekDay(w.dt_txt)}</span>
                            </div>
                            <div className={style.block_img}>
                                <img className={style.img} src={getIcons(w.weather[0].main, w.weather[0].description)}
                                     alt="weather"/>
                            </div>
                            <div className={style.block_day}>
                                <span> Temp day: {w.sys.pod === "d" && fromKelvinToCelsius(w.main.temp)}</span>
                                <span> Feels like: {w.sys.pod === "d" && fromKelvinToCelsius(w.main.feels_like)}</span>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            {errorStatus && <ErrorWindow errorText={errorText} />}
        </div>
    )
}


