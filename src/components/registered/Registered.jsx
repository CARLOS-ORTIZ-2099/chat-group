/* eslint-disable react/prop-types */
import { SendMessage } from '../send-message/SendMessage'
import './registered.css'

export const Registered = ({user, messages, useUid, handleEditMode, handleDeleteMessage, logOut, 
              handleChangeFields, setInfo, info, editMode, setEditMode
  }) => {


  return (
    <div className="row">
        <div className="col-12 col-md-4 relative-container mt-5 mb-5">
            <div className="card card-data main">
                <div className="card-body text-center">
                  <img className="img-fluid mb-3" src={user?.photoURL} alt="" />
                  <h3 className="text-capitalize">{user.displayName}</h3>
                  <p>{user.email}</p>
                  <button className="btn btn-secondary" onClick={logOut}>cerrar sesion</button>
                </div>
            </div>
        </div>

        <div className="col-12 col-md-8 border border-warning d-flex flex-column position">
          {
            messages?.map((message) => (
                <article className={useUid == message?.content?.uid ? 'my-message':'message'} key={message.id}>
                    <div>  
                      <div className='text-message '>
                        <p className='text p-2 '>{message.content.text}</p>
                      </div>
                      {
                        useUid == message?.content?.uid ?
                        <div className=' d-flex justify-content-end'>
                          <i onClick={() => handleEditMode(message.id)} className="bi bi-pen-fill"></i>
                          <i onClick={() => handleDeleteMessage(message.id)} className="bi bi-trash2-fill"></i>
                        
                        </div> 
                        :''
                      } 
                    </div>
                    <img className='rounded-5' width={'50px'} src={message.content.avatar} alt="" />
                </article>
            ))
          } 
          <SendMessage handleChangeFields={handleChangeFields} 
                      setInfo={setInfo}
                      info={info}
                      editMode={editMode}
                      setEditMode={setEditMode}
          />
        </div>
    </div>
  )
}
