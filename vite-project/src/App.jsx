import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ToDos from './components/ToDos'

//TODO: pri vsem ki se sajva dodaj local storage

function App() {
  const [savedTasks, setSavedTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [toDos, setToDos] = useState("")
  const [allToDos, setAllToDos] = useState({})
  const [editing, setEditing] = useState(false)

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && selectedTask) {
      const updated = {
        ...allToDos,
        [selectedTask]: [...(allToDos[selectedTask] || []), toDos]
      }
      setAllToDos(updated)
      setToDos("")
      setEditing(false)
    }
  }

  return (
    <main>
      <Navbar 
        savedTasks={savedTasks}
        setSavedTasks={setSavedTasks}
        setSelectedTask={setSelectedTask}
      />
      {selectedTask &&
        <ToDos 
          selectedTask={selectedTask}
          toDosList={allToDos[selectedTask] || []}
          editing={editing}
          setEditing={setEditing}
          toDos={toDos}
          handleOnKeyDown={handleOnKeyDown}
          allToDos={allToDos}
          setAllToDos={setAllToDos}
          setToDos={setToDos}
        />
        //TODO: dodaj vec stvari sem ko bos mel cajt
      }
    </main>
  )
}

export default App
