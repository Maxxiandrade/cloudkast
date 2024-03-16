import { ForecastDay } from "./Info"

interface Props{
    info:ForecastDay
}

const Astro:React.FC<Props> = ({info}) => {
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h1>Moon phase: {info.astro.moon_phase}</h1>
          <p>Moonrise: {info.astro.moonrise}</p>
          <p>Moonset: {info.astro.moonset}</p>
          <p>Sunrise: {info.astro.sunrise}</p>
          <p>Sunset: {info.astro.sunset}</p>
        </div>
  )
}

export default Astro