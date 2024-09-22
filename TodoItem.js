// src/components/TodoItem.js
import React, { useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Handle save updates
  const handleSave = () => {
    updateTodo(todo.id, {
      title: editedTitle,
      description: editedDescription,
      dueDate: editedDueDate
    });
    toggleEditMode();
  };

  return (
    <li style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            value={editedTitle} 
            onChange={(e) => setEditedTitle(e.target.value)} 
            placeholder="Title"
          />
          <input 
            type="text" 
            value={editedDescription} 
            onChange={(e) => setEditedDescription(e.target.value)} 
            placeholder="Description"
          />
          <input 
            type="date" 
            value={editedDueDate || ''} 
            onChange={(e) => setEditedDueDate(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={toggleEditMode}>Cancel</button>
        </>
      ) : (
        <>
          <div>
            <strong>{todo.title}</strong>: {todo.description}
            {todo.dueDate && <span> (Due: {todo.dueDate})</span>}
          </div>
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.isCompleted ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <button onClick={toggleEditMode}>Edit</button>  
        </>
      )}
    </li>
  );
}

export default TodoItem;
