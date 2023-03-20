import {useCarritoContext} from "../../context/CarritoContext";
import {Link} from "react-router-dom";
import  React from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify"
import {createOrdenCompra, getOrdenCompra, getProducto, updateProducto} from "../../firebase/firebase";
import { useState } from "react";

export const Checkout = ()=>{
    
    const [auxErrorNombre,setauxErrorNombre] = useState(true) 
              // va a estar en true si hay nombre y apellido
    const [auxMail,setauxMail] = useState("")                       // guarda el primer mail
    const [auxMailRepeat,setauxMailRepeat] = useState("") 
    const [auxErrorMail,setauxErrorMail] = useState(true)           // para habilitado el span 



    const {carrito, emptyCart, totalPrice} = useCarritoContext()
    const datosFormulario = React.useRef()
    let navigate = useNavigate()

    const consultarFormulario = (e)=> {
        e.prevenDefault()
        const datForm = new FormData( datosFormulario.current)
        const cliente = Object.fromEntries(datForm)
       
        const aux = [...carrito]

        aux.forEach(prodCarrito =>{
            getProducto(prodCarrito.id).then(prodBDD =>{
                prodBDD.stock -= prodCarrito.cant //descuento del stock la cantidad comprada
                updateProducto(prodCarrito.id, prodBDD)
            })
        })

        createOrdenCompra(cliente, aux, totalPrice(), new Date().toISOString()).then(ordenCompra =>{
            toast.success(`¡Muchas gracias por comprar con nosotros!, su orden de compra con el ID: ${ordenCompra.id
            } por un total de $ ${new Intl.NumberFormat('de-DE').format(totalPrice())} fue realizada con exito`)
            emptyCart()
            e.target.reset()
            navigate("/")
        })
    }

function checkTexto (valor) {                                   // para checkear que sea texto
    if (/^[a-zA-Z]+\s[a-zA-Z]+$/.test(valor)){               
        return true
    }
    return false
    }
    
    return (
        <>
        {carrito.length === 0
        ?
        <>

             <h2 className="textoEstilo">Carrito Vacío</h2>
        <Link className="nav-link" to={"/"}><button className="btn btn-dark">Continuar Comprando</button></Link>
        </>
        :
    <div className="formulario container" style={{marginTop: "20px"}} >
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
            <input type="email" className="form-control" name="email" required onChange={(event)=>{                    
                    setauxMail(event.target.value)
                    if (event.target.value===auxMailRepeat){
                        setauxErrorMail(true)
                    }    
                    else{
                        setauxErrorMail(false)
                    }     
                    }}/>
       </div>

            <div className="col-md-6">
            <label htmlFor="repEmail" className="form-label">Repetir Correo: </label>
            <input type="email" className="form-control" name="repEmail" required onChange={(event)=>{  
                    setauxMailRepeat(event.target.value)   
                    if (event.target.value===auxMail){
                        setauxErrorMail(true)
                    }    
                    else{
                        setauxErrorMail(false)
                    }               
                }}/>
                <span style={{display: auxErrorMail===false? 'block' : 'none'}} className="errorTexto">Debe escribir el mismo mail </span>
        </div>
            <div className="col-md-6">
            <label htmlFor="telefono" className="form-label">Telefono:</label>
            <input type="number" className="form-control" name="telefono" required/>
               
            </div>
            <div className="col-md-6">
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input type="text" className="form-control border border-secondary" name="direccion" required/>
           
                
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
  
           
            <button className="btn btn-primary botSumit" type="submit"  >Finalizar Compra</button>
        
        </form>

    </div>
}
</>
    )
}