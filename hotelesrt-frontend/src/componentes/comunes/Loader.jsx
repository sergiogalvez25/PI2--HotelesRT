

// <>

function Loader() {
    return (
        <div className="d-flex justify-content-center alig-items-center"
             style={{ minHeight: '400px'}}>
            <div className="spinner-border"
                style={{ color: '#003358', width: '3rem', height:'3rem'}}
                role="status">
               <span className="visually-hidden"> Cargando...</span>     
            </div>        
        </div>
    )
}
export default Loader 

