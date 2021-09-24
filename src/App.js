
import './App.css';
import React,{useState,useEffect} from 'react'

const getItems=()=>{
  let data= localStorage.getItem('datas')
  if(data){
    return JSON.parse(localStorage.getItem('datas'));
  }
  else{
    return [];
  }
}

function App() {
  const[lists,setLists]=useState(getItems())
  const[todovalue,setTodovalue]=useState('')
  const[isEditing,setIsEditing]=useState(false)
  const[currentTodo,setCurrentTodo]=useState({})
  const handleEditInputChange=(e)=>{
setCurrentTodo({...currentTodo,name:e.target.value})
  }
const handleEditClick=(todo)=>{
  setIsEditing(true)
  setCurrentTodo({...todo})
}
  
  const handleEditForm=(e)=>{
    e.preventDefault()
    handleUpdateTodo(currentTodo.id,currentTodo)
  }

  const handleUpdateTodo=(id,updatedTodo)=>{
    const updatedItem=lists.map(list=>{
      return list.id=== id ? updatedTodo:list
    })
    setIsEditing(false)
    setLists(updatedItem)
  }
 const  submitdata=(e)=>{
  e.preventDefault();
setLists([...lists,{id: lists.length + 1,name:todovalue}])
setTodovalue('')
  }
 const removetodo=(list) =>{
  setLists(lists.filter(value=> value!==list))
 }
 useEffect(() => {
   localStorage.setItem('datas',JSON.stringify(lists))
 }, [lists])

  return (
    <div className="container text-center pt-5" >{isEditing?(<form onSubmit={handleEditForm}>
<h2>Edit Todo</h2>
<label htmlFor="editTodo">Edit todo</label>
<input
 name="editTodo"
 type="text"
 placeholder="Edit todo"
 value={currentTodo.name}
 onChange={handleEditInputChange}
/>
<button type="submit">Update</button>
<button onClick={()=>setIsEditing(false)}>Cancel</button>
    </form>):
   ( <form onSubmit={submitdata}>
     <h2>Add Todo</h2>
      <label htmlFor="add todo">Add todo</label>
   <input 
   name="add todo"
   type="text"
   placeholder="Add todo"
  value={todovalue}
    onChange={(e)=>setTodovalue(e.target.value)}
      />
   <input type='submit'/>
   </form>)
}
   <ol>
   {
     lists.map(list=>(
      
      
      <li key={list.id}> {list.name}<button onClick={()=>{removetodo(list)}}>delete</button><button onClick={()=>{handleEditClick(list)}}>edit</button></li>
      
     ))
     
   }
   </ol>
   </div>
  );
}

export default App;
