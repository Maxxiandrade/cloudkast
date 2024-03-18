import { useState } from "react"
import random from '../../public/random.svg'
import randomCountries from '../random-countries'
interface Props{
    onSearch: (place:string) => Promise<void>
}

const Search:React.FC<Props> = ({onSearch}) => {
    const [place, setPlace] = useState('');
    const handleSubmit = (e:React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault()
        onSearch(place)
        
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target
        setPlace(value);
    }

    const handleRandom = ()=>{
        const randomNumber = Math.random()
        const cityNumber = Math.floor(randomNumber * 241)       
        onSearch(randomCountries[cityNumber]); 
        
    }
        return (
    <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">cloudKast</label><br />
        <input
         type="text"
         onChange={handleChange} 
         name="place" 
         placeholder='Search for any place'
         value={place}/>
        <button className="button">Search</button>
        <br />    
            <button  type="button" className="button" onClick={handleRandom}>
                <img src={random} alt="random_icon" className="random-icon" />Random
            </button>    
    </form> 
  )
}

export default Search