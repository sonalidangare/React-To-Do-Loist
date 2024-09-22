import './index.css'; 
import React, { useState , useEffect} from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  // Step 1: Load tasks from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];  // Load tasks if they exist, else start with an empty array
  });

  // Step 2: Save tasks to localStorage when 'todos' state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); 

  // New State: Search Term
  const [searchTerm, setSearchTerm] = useState('');

  // Add a new task
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  // Delete a task
  const deleteTodo = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  // Update a task
  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  // Filtered todos based on search term
  const filteredTodos = todos.filter(todo => 
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>To-Do List</h1>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search tasks by title..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
      />

      <AddTodo addTodo={addTodo} />

      {/* Pass filtered todos to the TodoList component */}
      <TodoList 
        todos={filteredTodos} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
        updateTodo={updateTodo} 
      />
    </div>
  );
}

export default App;
