import { useState } from "react";
import wind from "/wind.svg";
import rain from "/rain.svg";
import temperature from "/temperature.svg";
import switchIcon from "/switchIcon.svg";
import { ForecastDay } from './Info';

interface Props {
  forecastDay: ForecastDay;
}

const Actual: React.FC<Props> = ({ forecastDay }) => {
  const [metric, setMetric] = useState(false);
  const toggleMetric = () => {
    setMetric(!metric);
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    (e.target as HTMLImageElement).style.transform = 'scale(1.1)';
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    (e.target as HTMLImageElement).style.transform = 'scale(1)';
  };
  return (
    <>
      <div className="horizontal-container">
        <h2>
          <img
            src={switchIcon}
            alt=""
            className="icon"
            onClick={toggleMetric}
            style={{
              border: '2px solid black',
              borderRadius: '5px',
              transition: 'transform 0.3s',
              cursor: 'pointer',
              marginRight: '10px'
            }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
          <img src={temperature} alt="" className="icon" /> {metric ? `${forecastDay.day.mintemp_c} - ${forecastDay.day.maxtemp_c} C°` : `${forecastDay.day.mintemp_f} - ${forecastDay.day.maxtemp_f} F°`}
        </h2>
        <h2><img src={wind} alt="" className="icon" />{metric ? `${forecastDay.day.maxwind_kph} Km/h` : `${forecastDay.day.maxwind_mph} Mph`}</h2>
        <h2><img src={rain} alt="" className="icon" />{forecastDay.day.daily_chance_of_rain}%</h2>
      </div>
    </>
  )
}

export default Actual;
