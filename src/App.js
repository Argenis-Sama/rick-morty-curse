import imageRickMorty from './img/rick-morty.png'
import './App.css';
import { useState } from 'react';
import Personajes from './components/Personajes';
import Lugares from './components/Lugares';
import Episodios from './components/Episodios';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personajes,setPersonajes]=useState(null)
  const [lugares,setLugares]=useState(null)
  const [episodios,setEpisodios]=useState(null)
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

  const reqApiL =async ()=>{
    try {
      setIsLoading(true);
      setError(null);
      const api =await fetch("https://rickandmortyapi.com/api/location")
      if (!api.ok) {
        throw new Error("Error al obtener los datos");
      }
      const locationApi=await api.json()
      
      setLugares(locationApi.results)
      setInfo(locationApi.info)
    } catch (error) {
      setError(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  const reqApiE =async ()=>{
    try {
      setIsLoading(true);
      setError(null);
      const api =await fetch("https://rickandmortyapi.com/api/episode")
      if (!api.ok) {
        throw new Error("Error al obtener los datos");
      }
      const episodeApi=await api.json()
      
      setEpisodios(episodeApi.results)
      setInfo(episodeApi.info)
    } catch (error) {
      setError(error.message);
    }finally {
      setIsLoading(false);
    }
  }

  const limpiar = ()=>{
    setPersonajes(null);
    setEpisodios(null);
    setLugares(null);
    setError(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='title'>Rick & Morty</h1>
        {personajes?(
          <Personajes personajes={personajes} setp={setPersonajes} 
          info={info} setinfo={setInfo}
          carga={isLoading} setcarga={setIsLoading} error={error} seterror={setError}/>
        ):(<></>)}
        {lugares?(<Lugares lugares={lugares} setl={setLugares} 
          info={info} setinfo={setInfo}
          carga={isLoading} setcarga={setIsLoading} error={error} seterror={setError}/>
        ):(<></>)}
        {episodios?(
          <Episodios episodios={episodios} sete={setEpisodios} 
          info={info} setinfo={setInfo}
          carga={isLoading} setcarga={setIsLoading} error={error} seterror={setError}/>
        ):(<></>)}
        {error && <p onClick={limpiar} style={{ color: "red" }}>{error}</p>}

        {!personajes && !lugares && !episodios && !error && (
          <>
          <img src={imageRickMorty} alt='Rick & Morty' className='img-home'/>
          <div className='button-container'>
            <button onClick={reqApi} className='btn-search'>Buscar Personaje</button>
            <button onClick={reqApiE} className='btn-search'>Buscar Episodios</button>
            <button onClick={reqApiL} className='btn-search'>Buscar Lugares</button>
          </div>
          </>
        )}
        
      </header>
      <footer>
        <a target="_blank" href="https://icons8.com/icon/57324/rick-sanchez" rel="noreferrer">Rick Sanchez</a> icono de <a target="_blank" href="https://icons8.com" rel="noreferrer">Icons8</a>
      </footer>
    </div>
  );
}

export default App;
