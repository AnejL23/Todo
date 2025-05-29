

export default function TaskFolder({ children, onClick }) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer bg-gray-700 hover:bg-gray-500 p-2 rounded mb-2">
        {children}
      </div>
    )
  }