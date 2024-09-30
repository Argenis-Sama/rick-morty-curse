export default function Episodios(props) {
  const{episodios,sete, info, setinfo, carga, setcarga, error, seterror}=props
  const limpiar = ()=>{
    seterror(null);
    sete(null)
  }
  const page= async (urlapi)=>{
    try {
      setcarga(true);
      seterror(null);
      const url =await fetch(urlapi)
      if (!url.ok) {
        throw new Error("Error al obtener los datos");
      }
      const episodioApi=await url.json()
      sete(episodioApi.results)
      setinfo(episodioApi.info)
    } catch (error) {
      seterror(error.message);
    }finally {
      setcarga(false);
    }
    
  }
  return (
    <div className="characters">
     <h1>Episodios</h1>
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
       {episodios&&!carga?(episodios.map((episodios,index)=>(
         <div className="character-container" key={index}>
           <div>
             <h3>Titulo: {episodios.name}</h3>
             <h6>
               Codigo Episodio: {episodios.episode}
             </h6>
             <p>
               <span className="text-grey">Personajes: </span>
               <span>{episodios.characters.length}</span>
             </p>
             <p>
             <span className="text-grey">Fecha Emision: </span>
             <span>{episodios.air_date}</span>
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
};
