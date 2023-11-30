import './App.css'
import { NotRegistered } from './components/NotRegistered'
import { Registered } from './components/Registered'
import { SendMessage } from './components/SendMessage'
import { useMessages } from './hooks/useMessages'

function App() {

const {user, messages, useUid, handleEditMode, handleDeleteMessage,
   editMode, setEditMode, info, setInfo, login, logOut } = useMessages()

const handleChangeFields = (e) => setInfo(e.target.value)
if(messages.length < 1){
  return <span>obteniendo datos...</span>
}
  return ( 
        <div>
              {
                user ?    
                <div>
                    <Registered user={user} logOut={logOut} messages={messages} 
                      useUid={useUid} handleEditMode={handleEditMode} 
                      handleDeleteMessage={handleDeleteMessage}/>
                
                    <SendMessage  editMode = {editMode} 
                      setEditMode= {setEditMode}
                      handleChangeFields={handleChangeFields}
                      info={info}
                      setInfo={setInfo}
                    />
                </div>
                : <NotRegistered login={login}/>
              }
        </div>  
  )
}

export default App
