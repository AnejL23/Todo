export default function ToDos({ selectedTask, toDosList, setEditing, editing, allToDos, toDos, setToDos ,setAllToDos, handleOnKeyDown }) {

  const handleDelete = (index) => {
    const updatedToDos = allToDos[selectedTask].filter((_, i) => i !== index)
    setAllToDos({
      ...allToDos,
      [selectedTask]: updatedToDos
    })
  }

    return (
      <section className="ml-55 p-8 bg-slate-700 m-5 rounded-lg h-full max-w-2xl shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-500 pb-4">
          <h2 className="font-semibold text-3xl text-slate-100">{selectedTask}</h2>
          <button 
            onClick={() => setEditing(true)} 
            className="text-slate-100 bg-slate-600 rounded-md text-sm px-4 py-2 font-medium hover:bg-slate-500 transition-colors duration-200"
          >
            Add Task
          </button>
        </div>
        <div className="mt-6">
          <ul className="space-y-3">
            {toDosList.map((todo, index) => (
              <li key={index} className="flex items-center justify-between bg-slate-600/50 p-4 rounded-md hover:bg-slate-600/70 transition-colors duration-200">
                <span className="text-slate-100 text-base">{todo}</span>
                <button 
                  onClick={() => handleDelete(index)} 
                  className="text-slate-300 hover:text-red-400 transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {editing && (
          <div className="mt-6">
            <input
              type="text"
              className="w-full p-3 rounded-md bg-slate-600/50 border border-slate-500 text-slate-100 placeholder-slate-400 focus:border-slate-400 focus:outline-none text-base"
              value={toDos}
              onKeyDown={handleOnKeyDown}
              onChange={(e) => setToDos(e.target.value)}
              placeholder="Enter your task..."
              autoFocus
            />
          </div>
        )}
      </section>
    )
  }
  