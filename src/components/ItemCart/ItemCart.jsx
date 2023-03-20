import { Link } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import React from "react"
import { useCarritoContext } from "../../context/CarritoContext";

export const ItemCart = ({item}) => {
  const {removeItem} =useCarritoContext()
    return (
      <div className="card mb-3 cardCart w-50 text-center">
          <div className="row g-0"  >
            <div className="col-md-4">
            <img src={item.imagen} alt={`Imagen de producto ${item.nombre}`} className="img-fluid rounded-start"/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
                <h5 className="cart-title textoEstilo">{item.nombre} {item.modelo}</h5>
                <p className="card-text textoEstilo">Cantidad: {item.cant}</p>
                <p className="card-text textoEstilo">Precio Unitario: ${new Intl.NumberFormat('de-DE').format(item.precio)}</p>
                <p className="card-text textoEstilo">Subtotal: ${new Intl.NumberFormat('de-DE').format(item.precio * item.cant)}</p>
                <button className="btb btn-danger" onClick={()=> removeItem(item.id)}>Eliminar del carrito</button>
            </div>
          </div>
        </div>
        </div>
    );
}
