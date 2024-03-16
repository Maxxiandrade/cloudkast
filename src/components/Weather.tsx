import { Data } from "../types"

interface Props{
    data: Data | null
}

const Weather: React.FC<Props> = ({data}) => {
    if (!data) {
        return null;
    }

    const setBackground = () => {
        const body: HTMLBodyElement = document.querySelector('body');
        let color: string;
        let opacity: number;

        switch(data.current.condition.text.toLowerCase()) {
            case 'sunny':
                color = '#CACA1C';
                opacity = 1;
                break;
            case 'clear':
                color = '#56A5E5';
                opacity = 1;
                break;
            case 'partly cloudy':
                color = '#A0A18C';
                opacity = 1;
                break;
            case 'cloudy':
                color = '#B7B8AB';
                opacity = 1;
                break;
            case 'overcast':
                color = '#ACAE9C';
                opacity = 1;
                break;
            case 'mist':
                color = '#BCBDA9';
                opacity = 1;
                break;
            case 'patchy rain nearby':
                color = '#7BB5BE    ';
                opacity = 1;
                break;
            case 'light rain shower':
                color = '#0C3F68    ';
                opacity = 1;
                break;
            case 'light rain':
                color = '#0C3F68    ';
                opacity = 1;
                break;
           
            default:
                color = 'black'; // Color de fondo predeterminado
                opacity = 0.8; // Opacidad predeterminada
        }

        body.style.transition = 'background-color 0.5s, opacity 0.5s'; // Transición suave
        body.style.backgroundColor = color;
        body.style.opacity = opacity.toString();
    }

    // Llama a setBackground cuando recibas los datos
    setBackground();

    return (
        <div>
            <h1>
                {data.current.condition.text}
                <img src={data.current.condition.icon} alt="weather-status" />
            </h1>
        </div>
    );
}

export default Weather;
