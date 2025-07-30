import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

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
    const index = todos.findIndex(item => item.id === id)
    let temp = [...todos]
    temp[index].isCompleted = !temp[index].isCompleted
    setTodos(temp)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="rounded-3xl w-11/12 max-w-screen-lg mx-auto mt-4 flex flex-col items-center backdrop-blur-2xl shadow-[0_0_100px_0_#6f0ffa] overflow-hidden">
        <div className='text-5xl sm:text-6xl md:text-8xl p-4 w-full text-center'>WhatToDo</div>
        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-2 px-2'>
          <div className="w-full sm:w-4/5 flex flex-col sm:flex-row gap-2 relative">
            <div className='w-full relative border rounded'>
              <input onChange={handleChange} type="text" value={todo} className='text-lg sm:text-2xl p-2 outline-none w-[93%]' placeholder='Enter a task...'/>
              <button onClick={handleAdd} disabled={todo.length < 1} type="button" className=' cursor-pointer h-10 sm:h-12 absolute right-2 top-1/2 transform -translate-y-1/2'>
                <FaPlus className='text-xl sm:text-2xl font-extrabold' />
              </button>
            </div>
            <div className='border rounded px-4 py-2 text-center'>
              <button onClick={toggleShowFinished} className=' cursor-pointer w-full text-lg sm:text-2xl whitespace-nowrap'>Show finished</button>
            </div>
          </div>
        </div>
        <div className="my-5 p-2 text-lg sm:text-2xl w-full sm:w-4/5">
          {todos.length === 0 && <div className='text-center'>No Todos</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl mb-5 shadow-[0_3px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_7px_75px_0_rgba(99,51,238,0.5)] bg-[rgba(30,20,60,0.8)] p-4 justify-between">
                <div className='flex items-center gap-4 w-full sm:w-auto'>
                  <input onChange={handleCheck} type="checkbox" id={item.id} checked={item.isCompleted} className="accent-indigo-600 w-5 h-5 self-center flex- cursor-pointer"/>
                  <div className={`text-xl w-full sm:flex-1`} style={{textDecoration: item.isCompleted ? 'line-through' : 'none', color: item.isCompleted ? 'rgba(225, 210, 190,0.6)' : 'antiquewhite', wordBreak: 'break-word' }}>
                    {item.todo}
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button onClick={() => handleEdit(item.todo, item.id)} type="button" className="edit cursor-pointer rounded text-[1.2rem] hover:bg-[rgba(99,51,238,0.2)] p-[0.44em_0.78em]" aria-label="Edit"><FaEdit/></button>
                  <button onClick={() => handleDelete(item.id)} type="button" className="cursor-pointer rounded text-[1.2rem] hover:bg-[rgba(240,90,90,0.13)] p-[0.44em_0.78em]" aria-label="Delete"><FaTrashAlt/></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App;
