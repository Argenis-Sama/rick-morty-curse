export default function Lugares(props) {
    const{lugares,setl, info, setinfo, carga, setcarga, error, seterror}=props
  const limpiar = ()=>{
    seterror(null);
    setl(null)
  }
  const page= async (urlapi)=>{
    try {
      setcarga(true);
      seterror(null);
      const url =await fetch(urlapi)
      if (!url.ok) {
        throw new Error("Error al obtener los datos");
      }
      const lugaresApi=await url.json()
      setl(lugaresApi.results)
      setinfo(lugaresApi.info)
    } catch (error) {
      seterror(error.message);
    }finally {
      setcarga(false);
    }
    
  }
  return (
    <div className="characters">
     <h1>Lugares</h1>
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
       {lugares&&!carga?(lugares.map((lugares,index)=>(
         <div className="character-container" key={index}>
           <div>
             <h3>Nombre: {lugares.name}</h3>
             <h6>
               Tipo: {lugares.type}
             </h6>
             <p>
               <span className="text-grey">Habitantes: </span>
               <span>{lugares.residents.length}</span>
             </p>
             <p>
             <span className="text-grey">Dimension: </span>
             <span>{lugares.dimension}</span>
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
