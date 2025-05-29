import { useState, useEffect, useRef } from "react"
import TaskFolder from "./TaskFolder"

export default function Navbar({ savedTasks, setSavedTasks, setSelectedTask }) {
  const [taskInput, setTaskInput] = useState("")
  const [editing, setEditing] = useState(false)
  const [openDropbox, setOpenDropbox] = useState(null)
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingInputValue, setEditingInputValue] = useState("")

  const dropdownRefs = useRef([])
  const renameInputRefs = useRef([])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && taskInput.trim()) {
      setSavedTasks([...savedTasks, taskInput])
      setTaskInput("")
      setEditing(false)
    }
  }

  const toggleDropbox = (index) => {
    setOpenDropbox(openDropbox === index ? null : index)
  }

  const handleDelete = (index) => {
    const updatedTask = savedTasks.filter((_, i) => i !== index)
    setSavedTasks(updatedTask)
    if (openDropbox === index) setOpenDropbox(null)
  }

  const handleRename = (index) => {
    setEditingIndex(index)
    setEditingInputValue(savedTasks[index])
    setOpenDropbox(null)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOnDropdown = dropdownRefs.current.some(ref => ref && ref.contains(event.target))
      const clickedOnRenameInput = renameInputRefs.current.some(ref => ref && ref.contains(event.target))

      if (!clickedOnDropdown && !clickedOnRenameInput) {
        setOpenDropbox(null)
        setEditingIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="h-full w-52 bg-gray-800 text-white fixed left-0 top-0 flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">Task Manager</div>
      <nav className="flex-1 p-4 flex flex-col space-y-2">
        <button
          onClick={() => setEditing(true)}
          className="bg-gray-500 hover:bg-gray-300 w-10 pb-1 rounded text-black font-bold"
        >
          +
        </button>
        <ul>
          {savedTasks.map((task, index) => (
            <li onClick={() => setSelectedTask(task)} className="cursor-pointer flex items-center justify-between bg-gray-700 hover:bg-gray-500 p-2 rounded mb-2" key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingInputValue}
                  ref={(el) => renameInputRefs.current[index] = el}
                  onChange={(e) => setEditingInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const updatedTasks = [...savedTasks]
                      updatedTasks[index] = editingInputValue.trim()
                      setSavedTasks(updatedTasks)
                      setEditingIndex(null)
                      setOpenDropbox(null)
                    } else if (e.key === "Escape") {
                      setEditingIndex(null)
                      setOpenDropbox(null)
                    }
                  }}
                  autoFocus
                  className="p-1 text-black rounded w-full"
                />
              ) : (
                <TaskFolder>
                  {task}
                </TaskFolder>
              )}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleDropbox(index)
                  }}
                >
                  ⋮
                </button>
                {openDropbox === index && (
                  <div
                    ref={(el) => dropdownRefs.current[index] = el}
                    className="absolute right-0 top-full mt-1 bg-white text-black border rounded shadow-md z-10"
                  >
                    <button
                      onClick={() => handleRename(index)}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {editing && (
          <input
            type="text"
            className="border border-gray-400 mt-1 p-1 rounded w-full text-black"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )}
      </nav>
    </header>
  )
}
