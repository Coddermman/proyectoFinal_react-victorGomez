import React from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import {useState} from 'react';
export const Contacto = () => {
  const [auxErrorNombre,setauxErrorNombre] = useState(true) 
              // va a estar en true si hay nombre y apellido
    const [auxMail,setauxMail] = useState("")                       // guarda el primer mail
    const [auxMailRepeat,setauxMailRepeat] = useState("") 
    const [auxErrorMail,setauxErrorMail] = useState(true)           // para habilitado el span 
    
    function checkTexto (valor) {                                   // para checkear que sea texto
      if (/^[a-zA-Z]+\s[a-zA-Z]+$/.test(valor)){               
          return true
      }
      return false
      }

    const datosFormulario = React.useRef() 
    let navigate = useNavigate()
    const consultarFormulario =(e)=>{  
        e.preventDefault()
        console.log(datosFormulario.current)
        const datForm = new FormData(datosFormulario.current)
        const contacto = Object.fromEntries(datForm)
        console.log(contacto)
        e.target.reset()
        toast.success("Consulta enviada correctamente")
        navigate("/")
    }
    return (
        <div className="formulario" >
            <div >
        <form onSubmit={consultarFormulario} ref={datosFormulario}>
  <div className="col-md-6">
    <label htmlFor="nombre" className="form-label">Nombre y Apellido:</label>
    <input type="text" className="form-control" name="nombre" required onChange={(event)=>{
                    setauxErrorNombre(checkTexto(event.target.value))
                    if (event.target.value===""){
                        setauxErrorNombre(true)
                    }             
                }}/>
                <span style={{display: auxErrorNombre===false? 'block' : 'none'}} className="errorTexto" >Debe Escribir solo texto Nombre y Apellido </span>
      </div>
  
  <div className="col-md-6">
    <label htmlFor="email" className="form-label">Correo: </label>
        <input type="email" className="form-control" name="email" required />
        </div>
        <div className="col-md-6">
    <label htmlFor="telefono" className="form-label">Telefono:</label>
    <input type="number" className="form-control" name="telefono" required/>
      </div>    
 
  <div className="col-md-6">
    <label htmlFor="ciudad" className="form-label">Ciudad:</label>
    <input type="text" className="form-control" name="ciudad" required/>
    <div >
      
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="region" className="form-label">Región</label>
    <select className="form-select" name="region" required>
      <option selected disabled value="">Región</option>
      <option>Arica-Parinacota. Tarapacá Antofagasta. Atacama</option>
      <option>Coquimbo. Valparaíso. Metropolitana. O'Higgins.</option>
      <option>Maule. Ñuble. Bío Bío. Araucanía.</option>
      <option>Los Ríos. Los Lagos. Aysén. Magallanes y Antártica Chilena</option>
    </select>
    
  </div>
  
  
  <div className="col-md-6">

  <label htmlFor="consulta" className="form-label">Describa su Requerimiento:</label>
  <textarea className="form-control" name="consulta" rows={6} defaultValue={""} required/>
</div>
  <div >
    <button className="btn btn-primary botSumit" type="submit">Enviar formulario</button>
  </div>
</form>
</div>
</div>
    );
}


