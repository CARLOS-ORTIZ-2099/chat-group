/* eslint-disable react/prop-types */
import { useState } from "react"
import { db, auth } from "../firebase/firebase"
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

export const SendMessage = ({ editMode , setEditMode, handleChangeFields, info, setInfo}) => {

const sendData = async (e) => {
  
    e.preventDefault()
    if(info == ''){
      return alert('inserta un caracter')
    }
     if(editMode.edit){
      let refDoc = doc(db ,'messages', editMode.id)
      let resp =  await getDoc(refDoc)
      console.log(resp.data())
      await  updateDoc(refDoc, {...resp.data(), text:info})
      setEditMode({...editMode, edit: false, id:''})
      setInfo('')
    }else { 
      console.log(auth.currentUser)
      const {uid, displayName, photoURL } = auth.currentUser
      const refCollection = collection(db, 'messages')
      await addDoc(refCollection, {text: info, uid, name:displayName, avatar: photoURL, date:serverTimestamp()})
      setInfo('')
     } 
}

  return (
    <div>
        <form onSubmit={sendData}>
            <textarea onChange={handleChangeFields} value={info}   placeholder="write message" />
            <button type="submit">
              {
                editMode.edit ? 'editar': 'send'
              }
            </button>
        </form>
    </div>
  )
}
