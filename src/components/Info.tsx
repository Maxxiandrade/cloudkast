import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Actual from "./Actual";
import Astro from "./Astro";


const API_KEY = import.meta.env.VITE_API_KEY;

interface Condition {
  icon: string;
  text: string;
}

interface DayData {
  mintemp_c: number;
  maxtemp_c: number;
  mintemp_f: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  daily_chance_of_rain: number;
}

interface HourData {
  time: string;
  condition: Condition;
  kmhwind: number;
  mphwind: number;
  temp_c: number;
  temp_f: number;
}

interface AstroInfo {
  moon_phase: string
  moonrise: string
  moonset: string
  sunrise: string
  sunset: string
}

export interface ForecastDay {
  date: string;
  astro: AstroInfo;
  day: DayData;
  hour: Array<HourData>;
}

const Info: React.FC = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState<ForecastDay[]>([]);
  const [toggleAstro, setToggleAstro] = useState(false);
  const [loading, setLoading] = useState(false); // Inicializa como false
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true); // Establece loading en true al iniciar la solicitud
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${name}&days=1&aqi=no&alerts=no`
        );
        setInfo(response.data.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false); // Establece loading en false al finalizar la solicitud
      }
    };

    fetchInfo();
  }, [name]); // Incluye name como dependencia

  const astroRef = useRef<HTMLDivElement>(null);

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
    <div className="container" style={{ minHeight: toggleAstro ? '100vh' : 'auto' }}>
      <button className="button" onClick={() => navigate('/home')}>Back</button>
      <div>
        {loading ? (
          <div className="div-container">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="div-container">
            <div className="error">{error}</div>
          </div>
        ) : (
          <>
            {info.map((day, index) => (
              <div key={index}>
                <h1>
                  {name} - {day.date}
                </h1>
                <Actual forecastDay={day} />
                <div className="hour-grid">
                  {day.hour.map((hour, hourIndex) => {
                    const timeParts = hour.time.split(" ")[1].split(":");
                    const hourPart = timeParts[0];
                    const minutePart = timeParts[1];
                    const conditionText =
                      hour.condition.text.length > 15
                        ? `${hour.condition.text.slice(0, 15)}...`
                        : hour.condition.text;

                    return (
                      <div className="hour-item" key={hourIndex}>
                        <div className="hour-time">
                          {hourPart}:{minutePart}
                        </div>
                        <div className="hour-condition">
                          {conditionText}{" "}
                          <img
                            src={hour.condition.icon}
                            alt="icon_hour"
                            className="icon"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={handleToggleAstro}
                  className="button"
                >
                  {toggleAstro ? 'Hide Astro information' : 'Show Astro information'}
                </button>

                <br />
                <br />
                <br />
                <br />
                <br />
                <label style={{ display: "block", marginTop: "10px", fontSize: "1.5rem" }}>cloudKast</label>
                {toggleAstro && (
                  <div className="astro-container" ref={astroRef}>
                    <br />
                    <Astro info={day} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Info;
