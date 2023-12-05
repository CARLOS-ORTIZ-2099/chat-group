/* import './App.css' */
import { Charging } from './components/charging/Charging'
import { NotRegistered } from './components/not-registered/NotRegistered'
import { Registered } from './components/registered/Registered'
import { useMessages } from './hooks/useMessages'

function App() {

const {user, messages, useUid, handleEditMode, handleDeleteMessage,
        editMode, setEditMode, info, setInfo, login, logOut } = useMessages()

const handleChangeFields = (e) => setInfo(e.target.value)

  if(messages.length < 1){
    return <div className="d-flex  align-items-center min-vh-100 ">
                <Charging/>
          </div>
  }

  return ( 
        <div className=' min-vh-100 container'>
              {
                user ?    
                <div>
                    <Registered user={user} logOut={logOut} messages={messages} 
                      useUid={useUid} handleEditMode={handleEditMode} 
                      handleDeleteMessage={handleDeleteMessage}
                      editMode={editMode}
                      setEditMode={setEditMode} info={info} setInfo={setInfo}
                      handleChangeFields={handleChangeFields}
                      />
                </div>
                : <NotRegistered login={login}/>
              }
        </div>  
  )
}

export default App
