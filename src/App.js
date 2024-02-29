import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];

  });
  const [completeTodo, setCompleteTodo] = useState(() => {
    const storedCompleteTodos = localStorage.getItem('completeTodos');
    return storedCompleteTodos ? JSON.parse(storedCompleteTodos) : [];
  });
  const [checkedTodo, setCheckedTodo] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    
    const storedCompleteTodos = localStorage.getItem('completeTodos');
    if (storedCompleteTodos) {
      setCompleteTodo(JSON.parse(storedCompleteTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('completeTodos', JSON.stringify(completeTodo));
  }, [completeTodo]);
  


  const addTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, { text: newTodo, checked: false }]);
      setCheckedTodo([...checkedTodo, false]);
      setNewTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    const updatedCheckedTodo = [...checkedTodo];
    updatedCheckedTodo.splice(index, 1);
    setCheckedTodo(updatedCheckedTodo);
  };

  const MycompleteTodo = (index) => {
    const completeTodoItem = todos[index];
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setCompleteTodo([...completeTodo, completeTodoItem.text]);
    setTodos(updatedTodos);
    const updatedCheckedTodo = [...checkedTodo];
    updatedCheckedTodo.splice(index, 1);
    setCheckedTodo(updatedCheckedTodo);
  };

  const removeCompleteTodo = (index) => {
    const updatedCompleteTodos = [...completeTodo];
    updatedCompleteTodos.splice(index, 1);
    setCompleteTodo(updatedCompleteTodos);
  };

  const handleTextChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleCheckbox = (index) => {
    const newCheckTodos = [...checkedTodo];
    newCheckTodos[index] = !newCheckTodos[index];
    setCheckedTodo(newCheckTodos);
  };

  return (
    <div className="App">
      <div className='Top_element'>
        <h1> Add Todo List</h1>
        <input
          type="text"
          placeholder="Todo text"
          value={newTodo}
          onChange={handleTextChange}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div className='lower_element'>
        <div className='left_element'>
        <h2>Todo list</h2>
          {todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', width: "80%", height: '40px', alignItems: 'center' }}>
              <div>
                <input
                  type='checkbox'
                  checked={checkedTodo[index]}
                  onChange={() => handleCheckbox(index)}
                />
                {todo.text}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '30%', }}>
                <button onClick={() => removeTodo(index)}>Remove</button>
                <button disabled={!checkedTodo[index]} onClick={() => MycompleteTodo(index)}>Complete</button>
              </div>
            </div>
          ))}
        </div>
        <div className='right_element'>
          <h2>Completed Todos</h2>
          <ul>
            {completeTodo.map((todo, index) => (
              <li key={index}>
                {todo}
                <button onClick={() => removeCompleteTodo(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
