/* eslint-disable react/prop-types */


export const Registered = ({user, messages, useUid, handleEditMode, handleDeleteMessage, logOut}) => {
  

  return (
    <div>
      <img src={user?.photoURL} alt="" />
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <button onClick={logOut}>cerrar sesion</button>
      {
        messages?.map((message) => (
            <div key={message.id}>
          {/*   <h1>{message.id}</h1> */}
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
    </div>
  )
}
