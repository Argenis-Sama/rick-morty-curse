export default function Personajes(props) {
  const{personajes,setp, info, setinfo, carga, setcarga, error, seterror}=props
  const limpiar = ()=>{
    seterror(null);
    setp(null)
  }
  const page= async (urlapi)=>{
    try {
      setcarga(true);
      seterror(null);
      const url =await fetch(urlapi)
      if (!url.ok) {
        throw new Error("Error al obtener los datos");
      }
      const characterApi=await url.json()
      setp(characterApi.results)
      setinfo(characterApi.info)
    } catch (error) {
      seterror(error.message);
    }finally {
      setcarga(false);
    }
    
  }
   return (
     <div className="characters">
      <h1>Personajes</h1>
      {carga && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {info && info.prev && !carga &&(
        <span onClick={()=>page(info.prev)} className="back-home direcciones">Anterior</span>
      )}
      <span onClick={limpiar} className="back-home" >Volver a la home</span>
      {info && info.next && !carga && (
        <span onClick={()=>page(info.next)}  className="back-home direcciones">Siguiente</span>
      )}
      <div className="container-characters">
        {personajes&&!carga?(personajes.map((personajes,index)=>(
          <div className="character-container" key={index}>
            <div>
              <img src={personajes.image} alt={personajes.name}/>
            </div>
            <div>
              <h3>{personajes.name}</h3>
              <h6>
                {personajes.status==="Alive"?(
                  <>
                  <span className="alive"/>
                  Vivo
                  </>
                ):(<>
                  <span className="dead"/>
                  Muerto
                  </>)}
              </h6>
              <p>
                <span className="text-grey">Episodios: </span>
                <span>{personajes.episode.length}</span>
              </p>
              <p>
              <span className="text-grey">Especie: </span>
              <span>{personajes.species}</span>
              </p>
            </div>
          </div>
        ))):(<></>)}
      </div>
      {info && info.prev && !carga &&(
        <span onClick={()=>page(info.prev)} className="back-home direcciones">Anterior</span>
      )}
      <span onClick={limpiar} className="back-home" >Volver a la home</span>
      {info && info.next && !carga &&(
        <span onClick={()=>page(info.next)}  className="back-home direcciones">Siguiente</span>
      )}
     </div>
    )
}
 