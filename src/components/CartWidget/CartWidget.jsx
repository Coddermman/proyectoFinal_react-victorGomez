import { Link } from "react-router-dom";
import { useCarritoContext } from "../../context/CarritoContext";
const CartWidget = () => {
    const {getItemQuantity}= useCarritoContext()

    return (
        <>
        <Link className="nav-link" to={"/cart"}><i className="fa-solid fa-cart-arrow-down btn btn-dark"></i> 
       {getItemQuantity()> 0 && <span className="cantCarrito textoEstilo">{getItemQuantity()}</span>}</Link>

        </>
    );
}

export default CartWidget;
