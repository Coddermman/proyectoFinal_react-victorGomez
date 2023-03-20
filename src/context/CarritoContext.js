import { useContext, createContext, useState } from "react";
const CarritoContext = createContext()

export const useCarritoContext = () => useContext(CarritoContext)

export const CarritoProvider = (props) => {
    const [carrito, setCarrito] = useState([])

//agregar producto
const addItem = (producto, cantidad) => {
    
    if(isInCart(producto.id)) {// reemplazo la cantidad de productos
const indice = carrito.findIndex(prod => prod.id === producto.id)
const aux =[...carrito]
aux[indice].cant = cantidad
setCarrito(aux)

}else {// crear el objeto producto en carrito con los datos ingresados
const prodCart ={
    ...producto, 
    cant: cantidad
}
setCarrito([...carrito, prodCart])
}

}
//eliminar producto
const removeItem = (id) => {
    setCarrito(carrito.filter(prod => prod.id !== id))
}

//precio total de la compra
const totalPrice =()=>{
    return carrito.reduce((acum, prod) => acum += (prod.cant * prod.precio), 0)
}



//vaciar carrito
const emptyCart = () =>{
    setCarrito([])
}

//cantidad total de productos en el carrito

const getItemQuantity = ()=>{
    return carrito.reduce((acum,prod) => acum += prod.cant, 0)
}

//si existe producto en el carrito
const isInCart = (id) => {
    return carrito.find(prod=> prod.id === id)
}

return (
    <CarritoContext.Provider value={{carrito, addItem, removeItem, emptyCart, getItemQuantity, totalPrice }}>
{props.children}
    </CarritoContext.Provider>
)

}

