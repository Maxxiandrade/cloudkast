
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Landing from './components/Landing';
import Info from './components/Info';


function App() {

  return (
    <>
       <Routes>
      <Route path='/*' element={<Navigate to="/landing" />} />
      <Route path='/landing' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/info/:name' element={<Info/>}/>
    </Routes>
    </>
  )
}

export default App
