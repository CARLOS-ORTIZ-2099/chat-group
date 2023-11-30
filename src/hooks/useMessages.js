import { useEffect, useState } from "react"
import { onAuthStateChanged ,signInWithRedirect, GoogleAuthProvider,signOut } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'

const initial = {edit: false, id:''}

export const useMessages = () => {
    const [user, setUser] = useState(null)
    const [messages, setMessages] = useState([])
    const [info, setInfo] = useState('')
    const [editMode, setEditMode] = useState(initial)
    const useUid = auth?.currentUser?.uid;

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (data) => {
          console.log(data)
          setUser(data)
        }) 
        const unsubscribeMs = renderMessages()
        return () => { 
          unsubscribeAuth(); unsubscribeMs() 
        }
    }, [])

    function renderMessages () {
        const refCollection = collection(db, 'messages')
        const newQuery = query(refCollection, orderBy('date'))
        const unsubscribeMessages = onSnapshot(newQuery, (dataCurrent) => {
          const currentMessages = []
          dataCurrent.forEach((message) => {
            currentMessages.push({content : message.data(), id: message.id})
          })
          setMessages(currentMessages)
          console.log(currentMessages)
        })
    
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
        try{
          console.log(idMessage)
          let refDoc = doc(db,'messages', idMessage)
          await deleteDoc(refDoc)
        }catch(error){
          console.error(error)
        }finally{
          setInfo('')
          setEditMode(initial)
        }
         
    }

    const handleEditMode = async (idMessage) => {
        try{
           setEditMode({...editMode,edit:true ,id: idMessage})  
           let refDoc = doc(db, 'messages', idMessage)
           let response = await getDoc(refDoc)
           console.log(response.data())
           setInfo(response.data().text)
           console.log(info)
        }catch(error){
         console.error(error)
        }     
    }
      
    return {user, messages, useUid, handleEditMode, handleDeleteMessage, editMode, setEditMode, info, setInfo, login, logOut
    }

}
