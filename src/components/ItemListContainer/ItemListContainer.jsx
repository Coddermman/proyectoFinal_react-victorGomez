//consulta los productos
import { useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import {ItemList} from "../ItemList/ItemList"
import { useDarkModeContext } from "../../context/DarkModeContext"

import { getProductos } from "../../firebase/firebase"
export const ItemListContainer = () => {
  const [productos, setProductos] = useState ([])
  const {idCategoria}= useParams()
  const {darkMode}= useDarkModeContext()
  console.log(darkMode)

  useEffect(()=>{
    if(idCategoria){
      // para colocar el nombre de la categoria en lugar del id
      let aux;
                switch (idCategoria) {
                    case 'RopaDeportiva':
                        aux=1;
                      break;
                    case 'Calzados':
                        aux=2;
                    break;                        
                    case 'Accesorios':
                        aux=3;
                      break;
                    
                    default:
                        console.log('algo pasa');
                }
      
        getProductos()
        .then(items =>{
          const products = items.filter(prod => prod.stock > 0).filter(prod => prod.idCategoria ===aux)                
          const productsList =  <ItemList products={products} plantilla={'item'}/>
         
          setProductos(productsList)
    })
  }else{
      getProductos()
      .then(items =>{
        const productos = items.filter(prod => prod.stock > 0)
        const productsList = <ItemList products={productos} plantilla={'item'}/>
         
          setProductos(productsList)
        

      })

    }



  },[idCategoria])
    return (
       
          <div className="row estiloProductos">
            
            {productos}
          
          </div>
       
    );
}
