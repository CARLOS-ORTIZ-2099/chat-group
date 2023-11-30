import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBToqPUelMkmC1oDQVMMoSPx_w2m0F-Ooo",
  authDomain: "chat-group-efee4.firebaseapp.com",
  projectId: "chat-group-efee4",
  storageBucket: "chat-group-efee4.appspot.com",
  messagingSenderId: "459891233418",
  appId: "1:459891233418:web:e14f293560aa7521391373"
};

// inicializando los servicios de firebase
export const app = initializeApp(firebaseConfig);

// inicializando el servicio de autenticacion de firebase y obteniendo la referencia a dicho servicio

export const auth = getAuth(app)

// creando una instancia del proveedor de google


/* creando metodo para el logueo del usuario, este metodo recibe 2 parametros, el 
primero la instancia al servicio de autenticacion, y el segundo el proveedor */
// signInWithRedirect(auth, provider)


export const db = getFirestore(app)