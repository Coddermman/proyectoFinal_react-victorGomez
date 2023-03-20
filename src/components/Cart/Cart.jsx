import { Link } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { useCarritoContext } from "../../context/CarritoContext";
export const Cart = () => {
    const {carrito, totalPrice, emptyCart} = useCarritoContext()
 
    return (
        <>
        {carrito.length === 0
            ?
            <>
            <h2> Carrito vacío</h2>
            <Link className="nav-link" to={'/'}><button className="btn btn-dark">Continuar Compra</button></Link>
            </>
            :
            <div className="container cartContainer">
                {
<ItemList products={carrito} plantilla ={'itemCart'}/>
                }
          
            <div className="divButtons textoEstilo">
                <p>Resumen de la compra: ${new Intl.NumberFormat('de-DE').format(totalPrice())}</p>
                <button className="btb btn-danger" onClick={() =>emptyCart() }>Vaciar carrito</button>
                <Link className="nav-link" to={'/'}><button className="btb btn-dark">Continuar Comprando</button></Link>
                <Link className="nav-link" to={'/checkout'}><button className="btb btn-dark">Finalizar Compra</button></Link>

            </div>
            </div>

            }   

            
        </>
        
    );
}

