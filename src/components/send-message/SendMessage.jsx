/* eslint-disable react/prop-types */
import { db, auth } from "../../firebase/firebase"
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'

export const SendMessage = ({ editMode , setEditMode, handleChangeFields, info, setInfo}) => {

const sendData = async (e) => {
    e.preventDefault()
    if(info == ''){
      return alert('inserta un caracter')
    }
    try{
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
    }catch(error){
      console.error(error)
    }
}

  return (
    <div className="p-3  text-center">
        <form className="row  d-flex justify-content-center  align-items-center" onSubmit={sendData}>
            <div className="col-9">
               <textarea className="form-control" onChange={handleChangeFields} value={info}   placeholder="write message" />
            </div>
            <div className="col-3"> 
              <button className={`${editMode.edit ? 'btn btn-secondary':'btn btn-primary'} my-3`} type="submit">
                {
                  editMode.edit ? 'editar': 'send'
                }
              </button>
            </div>
            
        </form>
    </div>
  )
}
