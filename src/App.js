import { useState } from 'react'
import './App.css';

let ID ;

function App() {
  
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [btn, setBtn] = useState(false);
  const [itemId, setItemId] = useState(null);


  ID = new Date().getTime().toString();


  const todosHandler = (e) => {
    e.preventDefault();
    if(value === ''){
      alert('Please Add a Todo')
    }
    else if(value !== '' && btn===true) {
      setTodos((items) => items.map((elem) => {
        if(elem.id === itemId){
          return{...elem, Todo: value}
        }
        return elem;
      }))
      setValue('');
      setBtn(false);
    }
    else{
      
      setTodos(oldValues => {
        return [...oldValues, {Todo : value, id: ID}]
      })
      setValue('')
    }
    
  }

  const editHandler = (idValue) => {
    const editItem = todos.find((oldTodos) => {
      return (oldTodos.id === idValue)
    })
    
    setValue(editItem.Todo);
    document.getElementById("input-text").focus();
    setBtn(true);
    setItemId(idValue);
    // console.log(editItem);
    // console.log(value);
    // console.log(!btn);
  }

  const deleteHandler = (id) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id)
    )
  }


  return (
    <div className="app">
      <h1>Sundaram's Todo App</h1>
      <form className='form' onSubmit={todosHandler}>
        <input id='input-text' type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='enter your todo' autoFocus/>
        <button type='submit'>{btn===true ? 'Modify'  : 'Add Todo'}</button>
      </form>
      <div className='form-todos'>
        {
          todos.map((item, Todo) => {
            return(
              <div className='todos' key={item.id}>
                <input className='todos-li' value={item.Todo} />
                <button className='todos-btn' onClick={() => deleteHandler(item.id)}>Done</button>
                <button className='todos-btn edit' onClick={() => editHandler(item.id)}>Edit</button>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
