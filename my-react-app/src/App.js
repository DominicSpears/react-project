import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect (() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect (() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos (prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    
    <p className='title'>Task Manager</p>
    <div className='counter'>{todos.filter(todo => !todo.complete).length} Tasks Remaining</div>
    <p className='addTask'>
      <input ref={todoNameRef} type="text" />
      <button className='addButton' onClick={handleAddTodo}>Add Task</button>
    </p>
    <div className='taskBody'>
      <p className='list'><TodoList todos={todos} toggleTodo={toggleTodo} /></p>
    </div>
    <p className='clearContainer'><button className='clearButton' onClick={handleClearTodos}>Clear Completed Tasks</button></p>
    </>
  )
}

export default App;
