import {ItemCount} from "../ItemCount/ItemCount"
import { useDarkModeContext } from "../../context/DarkModeContext"
import { useCarritoContext } from "../../context/CarritoContext"
import { Link } from "react-router-dom"
export const ItemDetail = ({item}) => {
const {darkMode} = useDarkModeContext()
const {addItem} = useCarritoContext()

    const onAdd=(cantidad) =>{//agregar el producto al carrito
        addItem(item, cantidad)
console.log(cantidad)
console.log(item)
console.log(item.nombre)
    }
    return (
        <div className="row g-2 productoIndividual">
           <div className="col-md-4 ">
            <img src={item.imagen} className="img-fluid rounded-start" alt={`Imagen de ${item.nombre}`}/> 
            </div>
            <div className="col-md-8 ">
                <div className="card-body textoEstilo ">
                    <h5 className="card-title">{item.nombre} {item.modelo}</h5>
                    <p className="card-text">Marca: {item.marca}</p>
                    <p className="card-text">Precio: ${new Intl.NumberFormat("de-DE").format(item.precio)}</p>
                    <p className="card-text">Stock: {item.stock}</p>
                    <ItemCount valInicial={1} stock={item.stock} precio={item.precio} onAdd={onAdd}/>
                    
                    <Link className="iconCar" aria-current="page"  to={"/cart"}><button className='btn btn-dark mt-3'>Finalizar Compra</button></Link>  
                </div>
                </div> 
        </div>
    )
}


