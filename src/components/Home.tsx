import { useEffect, useState } from 'react';
import '../App.css'
import axios from 'axios';
import { Data } from '../types';
import Weather from './Weather';
import Search from './Search';
import Location from './Location';
const API_KEY = import.meta.env.VITE_API_KEY

const fetchData = async(place:string)=>{
  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${place}&aqi=no`)
    return response.data
  } catch (error) {
    return null
  }
} 
const Home = () => {
    const [data, setData] = useState<Data | null>(null);
    useEffect(() => {
        const storedData = localStorage.getItem('weatherData');
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }, []);
    const onSearch = async(place:string):Promise<void>=>{
      const result = await fetchData(place)
      setData(result)
      localStorage.setItem('weatherData', JSON.stringify(result))
      
    }
  return (
    <div className='card-container'>
      <div className='card-div'>
        <Weather data={data}/>
        <Search onSearch={onSearch}/>
        <Location data={data}/>
      </div>
    </div>
  )
}

export default Home