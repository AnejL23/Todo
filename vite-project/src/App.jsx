import { useState } from 'react'
import ToDos from './components/ToDos'
import './App.css'

//TODO: pri vsem ki se sajva dodaj local storage

function App() {
  const [selectedTask, setSelectedTask] = useState('')
  const [editing, setEditing] = useState(false)
  const [toDos, setToDos] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [showCategoryInput, setShowCategoryInput] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [showDropdown, setShowDropdown] = useState(null)
  const [allToDos, setAllToDos] = useState({
    'Work': [],
    'Personal': [],
    'Shopping': [],
    'Health': [],
    'Other': []
  })

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter' && toDos.trim() !== '') {
      setAllToDos({
        ...allToDos,
        [selectedTask]: [...allToDos[selectedTask], toDos]
      })
      setToDos('')
      setEditing(false)
    }
  }

  const handleAddCategory = (e) => {
    if (e.key === 'Enter' && newCategory.trim() !== '') {
      setAllToDos({
        ...allToDos,
        [newCategory]: []
      })
      setNewCategory('')
      setShowCategoryInput(false)
    }
  }

  const handleRenameCategory = (e, oldName) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const newName = e.target.value
      const updatedToDos = { ...allToDos }
      updatedToDos[newName] = updatedToDos[oldName]
      delete updatedToDos[oldName]
      setAllToDos(updatedToDos)
      setEditingCategory(null)
      if (selectedTask === oldName) {
        setSelectedTask(newName)
      }
    }
  }

  const handleDeleteCategory = (category) => {
    const updatedToDos = { ...allToDos }
    delete updatedToDos[category]
    setAllToDos(updatedToDos)
    if (selectedTask === category) {
      setSelectedTask('')
    }
    setShowDropdown(null)
  }

  return (
    <div className="min-h-screen bg-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8 text-slate-100">Task Manager</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-700 rounded-lg p-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-slate-200">Categories</h2>
              <button
                onClick={() => setShowCategoryInput(true)}
                className="text-slate-300 hover:text-slate-100 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {showCategoryInput && (
              <div className="mb-4">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={handleAddCategory}
                  placeholder="New category..."
                  className="w-full p-2 rounded-md bg-slate-600/50 border border-slate-500 text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:outline-none text-sm"
                  autoFocus
                />
              </div>
            )}

            <div className="space-y-2">
              {Object.keys(allToDos).map((task) => (
                <div key={task} className="relative group">
                  {editingCategory === task ? (
                    <input
                      type="text"
                      defaultValue={task}
                      onKeyDown={(e) => handleRenameCategory(e, task)}
                      onBlur={() => setEditingCategory(null)}
                      className="w-full p-2 rounded-md bg-slate-600/50 border border-slate-500 text-slate-100 focus:border-slate-400 focus:outline-none text-sm"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedTask(task)}
                        className={`flex-1 text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                          selectedTask === task 
                            ? 'bg-slate-600 text-slate-100' 
                            : 'text-slate-300 hover:bg-slate-600/50 hover:text-slate-100'
                        }`}
                      >
                        {task}
                      </button>
                      <button
                        onClick={() => setShowDropdown(showDropdown === task ? null : task)}
                        className="p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {showDropdown === task && (
                    <div className="absolute right-0 mt-1 w-48 bg-slate-600 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setEditingCategory(task)
                            setShowDropdown(null)
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-500 transition-colors duration-200"
                        >
                          Rename
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(task)}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-500 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {selectedTask ? (
              <ToDos
                selectedTask={selectedTask}
                toDosList={allToDos[selectedTask]}
                setEditing={setEditing}
                editing={editing}
                allToDos={allToDos}
                toDos={toDos}
                setToDos={setToDos}
                setAllToDos={setAllToDos}
                handleOnKeyDown={handleOnKeyDown}
              />
            ) : (
              <div className="bg-slate-700 rounded-lg p-8 text-center shadow-xl">
                <p className="text-slate-300 text-lg">Select a category to view or add a new one</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
