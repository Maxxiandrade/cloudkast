import { NavigateFunction, useNavigate } from "react-router-dom"
import '../App.css'
const Landing = () => {
    const navigate: NavigateFunction = useNavigate()

  return (
    <>
    <h1>Welcome to cloudKast !</h1>
    <p>Look for the weather of any place in the world</p>
    <button onClick={()=>navigate('/home')} className="button">Let's go</button>
    </>
  )
}

export default Landing