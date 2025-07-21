import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState({})
  const handleAdd = () => {
    setTodos(...todos, { id: uuidv4, todo, isCompleted: false })
    setTodo('')
  }
  const handleEdit = () => { }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleDelete = () => { }
  return (
    <>
      <div className="container">
        <div className="input">
          <input onChange={handleChange} type="text" value={todo.task} />
          <button onClick={handleAdd} type="button">Save</button>
        </div>
        <div className="cards">
          {todos.map(item => {
            return (
              <div key={item.id} className="card">
                <input type="checkbox" checked={item.isCompleted} />
                <div className="text">{item.todo}</div>
                <button onClick={handleEdit} type="button" className="edit">Edit</button>
                <button onClick={handleDelete} type="button" className="delete">Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
