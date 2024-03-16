import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Actual from "./Actual";
const API_KEY = import.meta.env.VITE_API_KEY

interface Props {
  place: string;
}

interface HourData {
  time: string;
  condition: object;
  kmhwind: number;
  mphwind: number;
  temp_c: number;
  temp_f: number;
}

interface ForecastDay {
  date: string;
  astro: object;
  day: object;
  hour: Array<HourData>;
}
const Info: React.FC<Props> = ({ place }) => {
  const location = useParams();
  console.log(location.name);

  const [info, setInfo] = useState<ForecastDay[] | null>(null);
  const [toggleAstro, setToggleAstro] = useState(false);
  const [metric, setMetric] = useState(false);
  const fetchInfo = async (place: string) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.name}&days=1&aqi=no&alerts=no`
      );
      return response.data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const data = await fetchInfo(place);
      if (data) {
        setInfo(data.forecast.forecastday);
      }
    };

    getInfo();
  }, [place]);

  return (
    <>
      <div>
  {info?.map((info, index) => (
    <div key={index}>
      <h1>
        {location.name} - {info.date}
      </h1>
      <Actual info={info}/>

      <div className="hour-grid">
        {info.hour.map((hour, hourIndex) => {
          const timeParts = hour.time.split(" ")[1].split(":");
          const hourPart = timeParts[0];
          const minutePart = timeParts[1];

          return (
            <div className="hour-item" key={hourIndex}>
              <div className="hour-time">
                {hourPart}:{minutePart}
              </div>
              <div className="hour-condition">
                {hour.condition.text}{" "}
                <img src={hour.condition.icon} alt="" className="icon" />
              </div>
            </div>
          );
        })}
      </div>

      {toggleAstro && (
        <>
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h1>Moon phase: {info.astro.moon_phase}</h1>
          <p>Moonrise: {info.astro.moonrise}</p>
          <p>Moonset: {info.astro.moonset}</p>
          <p>Sunrise: {info.astro.sunrise}</p>
          <p>Sunset: {info.astro.sunset}</p>
        </div>
        </>
      )}

      <button onClick={() => setToggleAstro(!toggleAstro)} className="button">
        Toggle Astro information
      </button>
    </div>
  ))}
</div>

      <button
        onClick={() => {
          console.log(info);
        }}
      >
        hhh
      </button>
    </>
  );
};

export default Info;
