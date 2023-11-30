import { onAuthStateChanged ,signInWithRedirect, GoogleAuthProvider,signOut } from 'firebase/auth'
import { auth, db } from './firebase/firebase'
import './App.css'
import { useEffect, useState } from 'react'
import { SendMessage } from './components/SendMessage'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'


/*  el metodo onAuthStateChanged es un listener que estara pendiente de  cada cambio en la autenticacion,
    y ejecuta un callback con la nueva informacion, ahora este se ejecutara cada que se renderize el 
    componente, pero si probamos, veremos que este efecto o la logica que pueda haber se puede ejecutar
    N veces y la razon es que como este listener estara al tanto de cada actualizacion y por cada cambio 
    seteara el estado user, react vuelve a evaluar el jsx que dependa de ese estado y al notar cambio 
    pues renderizara el componente tantas veces como cambio se detecten en la autenticacion.
*/
function App() {
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [editMode, setEditMode] = useState({edit: false, id:''})
  const [info, setInfo] = useState('')
  const useUid = auth?.currentUser?.uid;

useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (data) => {
      console.log(data)
      console.log(messages)
      setUser(data)
    })
    const unsubscribeMs = renderMessages()
    /* aqui utilizamos la funcion de limpieza para cuando el componente se desmonte, para
       no seguir utilizando recursos en los llamados de ambos metodos de escucha, asi mismo 
       Al llamar a renderMessages() y guardar el valor que devuelve en una variable,
       Cuando el componente se desmonta (cuando se ejecuta el retorno del useEffect), unsubscribeMs() 
       se invoca, y eso es esencialmente lo mismo que ejecutar la función de cancelación devuelta por
       onSnapshot 
    */
    return () => { 
      unsubscribeAuth(); unsubscribeMs() 
    }
}, [])

function renderMessages () {
    const refCollection = collection(db, 'messages')
    const newQuery = query(refCollection, orderBy('date'))
    /* el onsnapshot es una funcion asincrona que escucha los cambios que se produscan en la DB, no 
       nesesitamos poner async y await ya que esta asincronia la maneja el callback que tiene dentro.
       ademas este callback recibe como parametro la data actualizada, muy similar al metodo
       onAuthStateChanged, el primer parametro que recibe es la referencia a la DB donde se ejecutara
       el listener o una consulta personalizada con filtros (que previamente ya haya recibido dicha 
       referencia a la DB)
     */ 
    const unsubscribeMessages = onSnapshot(newQuery, (dataCurrent) => {
      const currentMessages = []
      dataCurrent.forEach((message) => {
        currentMessages.push({content : message.data(), id: message.id})
      })
      setMessages(currentMessages)
    })
  /* el metodo onSnapshot yy onAuthStateChanged devuelven una funcion para cancelar la subscripcion a los 
     eventos de escucha a la DB y la autenticacion por eso lo retornamos, para que cuando se desmonte
     el componente evitar fugas de memoria o gastos innesesarios de recursos.
  */  
    return unsubscribeMessages
}


const login = () => {
    const provider = new GoogleAuthProvider
    signInWithRedirect(auth, provider)
}

const logOut = () => {
    signOut(auth)
}

const handleDeleteMessage = async (idMessage) => {
  console.log(idMessage)
  let refDoc = doc(db,'messages', idMessage)
  await deleteDoc(refDoc)
}

const handleEditMode = async (idTask) => {
    setEditMode({...editMode,edit:true ,id: idTask})  
    let refDoc = doc(db, 'messages', idTask)
    let response = await getDoc(refDoc)
    console.log(response.data())
    setInfo(response.data().text)
    console.log(info)
}

const handleChangeFields = (e) => {
  setInfo(e.target.value)
}

  return (
    <>  
        <div>
              <h2>data user</h2>
              {
                user ? 
                <>
                  <img src={user?.photoURL} alt="" />
                  <h2>{user.displayName}</h2>
                  <p>{user.email}</p>
                   <button onClick={logOut}>cerrar sesion</button>
                  {
                    messages?.map((message) => (
                      <div key={message.id}>
                        <h1>{message.id}</h1>
                        <img src={message.content.avatar} alt="" />
                          <p>{message.content.text}</p>
                        {
                          useUid == message?.content?.uid ?
                          <>
                            <button onClick={() => handleEditMode(message.id)}>editar</button>
                            <button onClick={() => handleDeleteMessage(message.id)}>eliminar</button>
                          </> 
                          :''
                         } 
                      </div>
                    ))
                   } 
                   <SendMessage  editMode = {editMode} 
                   setEditMode= {setEditMode}
                   handleChangeFields={handleChangeFields}
                   info={info}
                   setInfo={setInfo}
                   />
                </>
                :<>
                    <h1>sin imagen</h1>
                    <p>name user</p>
                    <button onClick={login}>loguear</button>
                </>
              }
        </div>
        
    </>
  )
}

export default App
