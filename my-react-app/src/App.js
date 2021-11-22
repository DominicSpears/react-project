import React, { useState, useRef } from 'react';
import TodoList from './TodoList';


function App() {
  const [items, setTodos] = useState([])
  const todoNameRef = useRef()

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos (prevTodos => {
      return [...prevTodos, {id: 1, name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <TodoList items={items}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Item</button>
      <button>Clear Item</button>
      <div>0 items remaining</div>
    </>
  )
}

export default App;
