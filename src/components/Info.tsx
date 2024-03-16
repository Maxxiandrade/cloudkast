import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Actual from "./Actual";
import Astro from "./Astro";
import { useNavigate } from "react-router-dom";
const API_KEY = import.meta.env.VITE_API_KEY;

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
  const navigate = useNavigate()
  const [info, setInfo] = useState<ForecastDay[] | null>(null);
  const [toggleAstro, setToggleAstro] = useState(false);

  const fetchInfo = async () => {
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
      const data = await fetchInfo();
      if (data) {
        setInfo(data.forecast.forecastday);
      }
    };
    getInfo();
  }, [place]);



  const astroRef = useRef(null);
  const handleToggleAstro = () => {
    setToggleAstro(!toggleAstro);
    // Se ejecuta después de un breve retraso para permitir que el DOM se actualice
    setTimeout(() => {
      if (!toggleAstro && astroRef.current) {
        window.scrollTo({
          top: astroRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <>
    <div className="container" style={{ minHeight: toggleAstro ? '100vh' : 'auto' }}>
    <button className="button" onClick={()=>navigate('/home')}>Back</button>
      <div>
        {info?.map((info, index) => (
            <div key={index}>
            <h1>
              {location.name} - {info.date}
            </h1>
            <Actual info={info} />

            <div className="hour-grid">
  {info.hour.map((hour, hourIndex) => {
    const timeParts = hour.time.split(" ")[1].split(":");
    const hourPart = timeParts[0];
    const minutePart = timeParts[1];
    const conditionText = hour.condition.text.length > 15 ? `${hour.condition.text.slice(0, 15)}...` : hour.condition.text; // Truncar el texto si es demasiado largo
    
    return (
      <div className="hour-item" key={hourIndex}>
        <div className="hour-time">
          {hourPart}:{minutePart}
        </div>
        <div className="hour-condition">
          {conditionText}{" "}
          <img src={hour.condition.icon} alt="icon_hour" className="icon" />
        </div>
      </div>
    );
  })}

</div>

            <button
              onClick={handleToggleAstro}
              className="button"
              >
              Toggle Astro information
            </button>
            <br />
            <br />
            <br />
            <br />
            <br />
            <label style={{ display: "block", marginTop: "10px", fontSize: "1.5rem" }}>cloudKast</label>
            {toggleAstro && (<>
            
        <div className="astro-container" ref={astroRef}>
            <br />
          <Astro info={info} />
        </div>
            </>
      )}
          </div>
        ))}
      </div>
        </div>
    </>
  );
};

export default Info;
