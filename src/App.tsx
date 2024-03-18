
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Info from './components/Info';
import { useEffect, useState } from 'react';


function App() {
  const [currentLocation, setCurrentLocation] = useState('')

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude.toString()
        const longitude = position.coords.longitude.toString()
        const coords = `${latitude},${longitude}`
        setCurrentLocation(coords)       
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
     
    }, []);
  return (
    <>
       <Routes>
      <Route path='/*' element={<Navigate to="/landing" />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/home' element={<Home currentLocation={currentLocation}/>} />
      <Route path='/info/:name' element={<Info/>}/>
    </Routes>
    </>
  )
}

export default App
