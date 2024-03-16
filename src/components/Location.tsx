import { Data } from "../types"
import {  useNavigate } from "react-router-dom"

interface Props{
    data: Data | null
}
const Location:React.FC<Props> = ({data}) => {
    const navigate = useNavigate()
    if (!data) {
        return null; 
    }
  
    const { location } = data;
    if(!location){
        return null
    }
    return (
        <div>
            <h1>{location.name}</h1>
            <h2>{location.region} - {location.country}</h2>
            <button className="button" onClick={()=>{navigate(`/info/${location.name}`)}}>More info</button>
        </div>
    );
}

export default Location