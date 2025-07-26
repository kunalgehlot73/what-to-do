import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  })
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    const getData = localStorage.getItem('todos')
    if (getData) {
      let todos = JSON.parse(getData)
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  const toggleShowFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo('')
  }

  const handleEdit = (item, id) => {
    setTodo(item)
    handleDelete(id)
  }

  const handleCheck = (e) => {
    const id = e.target.id
    const index = todos.findIndex(item => { return item.id === id })
    let temp = [...todos]
    temp[index].isCompleted = !temp[index].isCompleted
    setTodos(temp)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => { return item.id !== id })
    setTodos(newTodos)
  }

  return (
    <>
      <div className="container rounded-3xl" style={{ width: '80vw', margin: '10px auto 0', display: 'flex', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', fontFamily: 'monospace', backdropFilter: 'blur(33px)', boxShadow: '0 0 100px 0 #6f0ffa' }}>
        <div style={{ fontSize: '5rem', width: '100%', textAlign: 'center' }}>WhatToDo</div>
        <div className='w-full flex justify-center'><div className="input w-1/2 flex justify-center relative gap-2" >
          <div className='w-full relative'>
            <input onChange={handleChange} type="text" value={todo} className='border rounded w-full' style={{ height: '50px', fontSize: '25px', padding: '5px' }} />
            <button onClick={handleAdd} disabled={todo.length < 1} type="button" style={{ height: '50px', position: 'absolute', right: '10px' }} ><FaPlus style={{ fontSize: '25px', fontWeight: 'bolder' }} /></button>
          </div>


          <div className='border' style={{ padding: '5px' }}>
            {/* <input type="checkbox" id='showFinished' className='hidden w-full h-full' onChange={toggleShowFinished} checked={showFinished} /><label className='w-full h-full' htmlFor="showFinished">Show Finished</label> */}
            <button onClick={toggleShowFinished} style={{ fontSize: '25px', textWrap: 'nowrap' }}>Show finished</button>
          </div>
        </div></div>
        <div></div>
        {todos.length === 0 && <div>No Todos</div>}
        <div className="cards">
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="card">
                <input onChange={handleCheck} type="checkbox" id={item.id} checked={item.isCompleted} />
                <div className="text">{item.todo}</div>
                <button onClick={() => { handleEdit(item.todo, item.id) }} type="button" className="edit">Edit</button>
                <button onClick={() => { handleDelete(item.id) }} type="button" className="delete">Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App