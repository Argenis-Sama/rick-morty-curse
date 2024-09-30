import imageRickMorty from './img/rick-morty.png'
import './App.css';
import { useState } from 'react';
import Personajes from './components/Personajes';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personajes,setPersonajes]=useState(null)
  const [info, setInfo] = useState(null)

  const reqApi =async ()=>{
    try {
      setIsLoading(true);
      setError(null);
      const api =await fetch("https://rickandmortyapi.com/api/character")
      if (!api.ok) {
        throw new Error("Error al obtener los datos");
      }
      const characterApi=await api.json()
      
      setPersonajes(characterApi.results)
      setInfo(characterApi.info)
    } catch (error) {
      setError(error.message);
    }finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>Rick & Morty</h1>
        {personajes || error?(
          <Personajes personajes={personajes} setp={setPersonajes} 
          info={info} setinfo={setInfo}
          carga={isLoading} setcarga={setIsLoading} error={error} seterror={setError}/>
        ):(
          <>
          <img src={imageRickMorty} alt='Rick & Morty' className='img-home'/>
          <button onClick={reqApi} className='btn-search'>Buscar Personaje</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
