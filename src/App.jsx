import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
      <div className="container">
        <div className="input">
          <input onChange={handleChange} type="text" value={todo} />
          <button onClick={handleAdd} disabled={todo.length < 1} type="button" >Save</button>
          <input type="checkbox" onChange={toggleShowFinished} checked={showFinished} /><span>Show Finished</span>
        </div>
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