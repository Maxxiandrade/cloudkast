import { useState } from "react";
import wind from "/wind.svg"
import rain from "/rain.svg"
import temperature from "/temperature.svg"
import switchIcon from "/switchIcon.svg"

interface ForecastDay{
    day:object
}

interface Props{
    info:Array<ForecastDay>
}
const Actual:React.FC<Props> = ({info}) => {
    const [metric, setMetric] = useState(false);
    const toggleMetric = ()=>{
        setMetric(!metric)
    }
  return (
    <>
   <div className="horizontal-container">
  {metric ? (
    <h2>
        <img 
  src={switchIcon} 
  alt="" 
  className="icon" 
  onClick={toggleMetric} 
  style={{ 
    border: '2px solid black', 
    borderRadius: '5px', // Ajusta el valor según la cantidad de redondeo que desees
    transition: 'transform 0.3s', 
    cursor: 'pointer',
    marginRight:'10px' 
  }}
  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} // Aumenta la escala al pasar el mouse sobre la imagen
  onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Restablece la escala al retirar el mouse de la imagen
/>
      <img src={temperature} alt="" className="icon" /> {info.day.mintemp_c} - {info.day.maxtemp_c} C°
    </h2>
  ) : (
    <>
    <h2>
    <img 
  src={switchIcon} 
  alt="" 
  className="icon" 
  onClick={toggleMetric} 
  style={{ 
    border: '2px solid black', 
    borderRadius: '5px', // Ajusta el valor según la cantidad de redondeo que desees
    transition: 'transform 0.3s', 
    cursor: 'pointer',
    marginRight:'10px' 
  }}
  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} // Aumenta la escala al pasar el mouse sobre la imagen
  onMouseOut={(e) => e.target.style.transform = 'scale(1)'} // Restablece la escala al retirar el mouse de la imagen
/>
      <img src={temperature} alt="" className="icon"/>{info.day.mintemp_f} - {info.day.maxtemp_f} F°
    </h2>
    </>
  )}
  {metric ? (
    <h2><img src={wind} alt="" className="icon"/>{info.day.maxwind_kph} Km/h</h2>
  ) : (
    <h2><img src={wind} alt="" className="icon"/>{info.day.maxwind_mph} Mph</h2>
  )}
  <h2><img src={rain} alt="" className="icon"/>{info.day.daily_chance_of_rain}%</h2>
</div>
      </>
  )
}

export default Actual