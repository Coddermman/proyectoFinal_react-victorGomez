import { useState } from "react";
import {toast} from "react-toastify"

import { Link } from "react-router-dom";

export const ItemCount = ({valInicial,stock, onAdd}) => {
    const [contador, setContador]= useState (valInicial);
    const sumar = ()=> (contador < stock) &&  setContador(contador +1);
    const restar = ()=> (contador > valInicial) && setContador(contador-1); 
    const agregarCarrito =()=> {
        onAdd(contador)
        
        toast.success(`🚀Se agregan ${contador}   al carrito correctamente!`);
}
    return (
        <div>
           <button className="btn btn-dark btn-sm me-2 ms-2" onClick={()=> sumar()}>+</button>
          {contador} 
           <button className="btn btn-dark btn-sm me-2" onClick={()=> restar()}>-</button>
           <button className="btn btn-dark" onClick={()=> agregarCarrito()}>Agregar al carrito</button> 
           <div>
           <Link className="nav-link" to={'/'}><button className="btn btn-dark">Continuar Compra</button></Link>
           </div>
        </div>
    );
}


