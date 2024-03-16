import { useState } from "react";
import wind from "../../public/wind.svg"
import rain from "../../public/rain.svg"
import temperature from "../../public/temperature.svg"

interface ForecastDay{
    day:object
}

interface Props{
    info:Array<ForecastDay>
}
const Actual:React.FC<Props> = ({info}) => {
    const [metric] = useState(false);
  return (
    <>
    {metric ? (
        <h2>
          <img src={temperature} alt="" className="icon"/> {info.day.mintemp_c} - {info.day.maxtemp_c} C°
        </h2>
      ) : (
        <h2>
          <img src={temperature} alt="" className="icon"/>{info.day.mintemp_f} - {info.day.maxtemp_f} F°
        </h2>
      )}
      {metric ? (
        <h2><img src={wind} alt="" className="icon"/>{info.day.maxwind_kph} Km/h</h2>
      ) : (
        <h2><img src={wind} alt="" className="icon"/>{info.day.maxwind_mph} Mph</h2>
      )}

      <h2><img src={rain} alt="" className="icon"/>{info.day.daily_chance_of_rain}%</h2>
      </>
  )
}

export default Actual