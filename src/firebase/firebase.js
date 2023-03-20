// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, doc, addDoc, getDoc, getDocs, upDateDoc, updateDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "proyectoreact-5fbf1.firebaseapp.com",
  projectId: "proyectoreact-5fbf1",
  storageBucket: "proyectoreact-5fbf1.appspot.com",
  messagingSenderId: "702595910527",
  appId: "1:702595910527:web:95192daff27ca8fafaa84a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

 export const cargarBDD = async()=>{
  const promise = await fetch("./json/productos.json")
  const productos = await promise.json()
  productos.forEach( async (prod) => {
        await addDoc(collection(db,"productos"),{
              nombre: prod.nombre,
              marca: prod.marca,
              modelo: prod.modelo,
              idCategoria: prod.idCategoria,
              stock: prod.stock,
              precio: prod.precio,
              imagen: prod.imagen


        })
  })
}

export const getProductos= async()=>{
  const productos = await getDocs (collection(db,"productos"))
  const items = productos.docs.map(prod => {
      return {...prod.data(), id: prod.id}



  })
  return items
}
export const getProducto = async(id) =>{
const producto = await getDoc(doc(db, "productos", id))
const item = {... producto.data(), id: producto.id}
return item
}

export const updateProducto = async(id, info) =>{
await updateDoc(doc(db, "productos", id), info)

}

//export const deleteProducto = async(id) =>{
//await deleteDoc(doc(db, "productos", id))
//}

  export const createOrdenCompra = async(cliente, productos, precioTotal, fecha)=>{
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
      datosCliente: cliente,
      productos: productos,
      precioTotal: precioTotal,
      fecha: fecha
    })
      return ordenCompra
}
export const getOrdenCompra = async(id) =>{
  const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
  const oCompra = {... ordenCompra.data(), id: ordenCompra.id}
  return oCompra
  }