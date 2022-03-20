import sunnyIcon from "./../../picture/sunny-icon.png"
import fewClouds from "./../../picture/cloudy-partly-icon.png"
import cloudsIcon from "./../../picture/cloudy-icon.png"
import rainIcon from "./../../picture/rain-icon.png"
import drizzleIcon from "./../../picture/drizzle.png"
import thunderstormIcon from "./../../picture/thunder-lightning-storm-icon.png"
import snowIcon from "./../../picture/snow-icon.png"
import AtmosphereIcon from "./../../picture/hazy-icon.png"


export function getIcons(valueMain: string, valueDescription:string) {
    if (valueMain === "Clear") return sunnyIcon
    if (valueMain === "Clouds"){
        if(valueDescription === "few clouds") return fewClouds
        else return cloudsIcon
    }
    if (valueMain === "Rain" ) return rainIcon
    if (valueMain === "Drizzle" ) return drizzleIcon
    if (valueMain === "Thunderstorm") return thunderstormIcon
    if (valueMain === 'Snow') return snowIcon
    if (valueMain === 'Atmosphere') return AtmosphereIcon

}