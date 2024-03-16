import { useState } from "react"

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
        return (
    <form action="" onSubmit={handleSubmit}>
        <input
         type="text"
         onChange={handleChange} 
         name="place" 
         placeholder='Search for any place'
         value={place}/>
        <button className="button">Buscar</button>    


    </form>
    
  )
}

export default Search