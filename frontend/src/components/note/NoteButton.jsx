import React from 'react'

const NoteButton = () => {
  return (
    <span className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm">
    <button
      className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
    >
      Edit
    </button>
  
    <button
      className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
    >
      View
    </button>
  
    <button
      className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative"
    >
      Delete
    </button>
  </span>
  )
}

export default NoteButton
