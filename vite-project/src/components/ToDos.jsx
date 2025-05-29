export default function ToDos({ selectedTask, toDosList, setEditing, editing, allToDos, toDos, setToDos ,setAllToDos, handleOnKeyDown }) {

  const handleDelete = (index) => {
    const updatedToDos = allToDos[selectedTask].filter((_, i) => i !== index)
    setAllToDos({
      ...allToDos,
      [selectedTask]: updatedToDos
    })
  }

    return (
      <section className="ml-55 p-8 bg-gray-500 m-5 rounded h-full max-w-2xl">
        <div className="flex justify-between items-center border-b border-white">
          <h2 className="font-bold text-4xl text-white">{selectedTask}</h2>
          <button 
            onClick={() => setEditing(true)} 
            className="text-white border border-white rounded text-sm bg-green-600 p-1 font-bold"
          >
            ADD TASK
          </button>
        </div>
        <div>
          <ul className="pt-5 list-none pl-5 text-white text-lg flex flex-col items-center justify-between">
            {toDosList.map((todo, index) => (
              <li key={index}>{todo}
              <button onClick={() => handleDelete(index)} className="font-bold bg-green-500 p-1 rounded hover:bg-green-300 ml-70">Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {editing && (
          <input
            type="text"
            className="mt-2 p-2 rounded w-full"
            value={toDos}
            onKeyDown={handleOnKeyDown}
            onChange={(e) => setToDos(e.target.value)}
            autoFocus
          />
        )}
      </section>
    )
  }
  