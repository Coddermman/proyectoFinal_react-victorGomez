import{Link} from "react-router-dom"
import { useDarkModeContext } from "../../context/DarkModeContext";
export const Item = ({item}) => {
    const {darkMode}= useDarkModeContext()

    return (
    <div className={`card mb-4 estiloProducto ${darkMode ? 'text-white bg-secondary' : ' border-primary'} `}>
        <img src={item.imagen} className="card-img-top imagen" alt={`Imagen de ${item.nombre}`}/>
        <div className={`card-body ${darkMode ? 'estiloCuerpoDark ' :'estiloCuerpo'}`}>
            <h5 className="card-title">{item.nombre} {item.modelo}</h5>
            <p className="card-text">{item.marca}</p>
            <p className="card-text">$ {new Intl.NumberFormat(`de-DE`).format(item.precio)}</p>
            <button className={`btn ${darkMode ? 'btn-secondary' : 'btn btn-primary'}`}><Link className="nav-link" to={`/item/${item.id}`}>Ver Producto</Link></button>
        </div>
    </div>
    );
}


