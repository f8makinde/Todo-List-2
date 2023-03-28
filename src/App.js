import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage =() =>{
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({show:false, msg:'', type:''})
  function handleSubmit(e){
    e.preventDefault()
    if(!name){
      //display alert
  
        showAlert(true, '😞 Please enter value', 'danger')

   
    }
    else if(name && isEditing){
       setList(list.map((item) => {
        if(item.id === editId){
          return {...item, title:name}
        }
       return item
       }))
       setName('')
       setEditId(null)
       setIsEditing(false)
       showAlert(true, '😊 changed value', 'success')
    }
    else {
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      showAlert(true, '😊 Item added to the list', 'success')
      setName('')
    }
    console.log('hello')
  }
  const showAlert = (show=false, msg='', type='') =>{
    setAlert({show, type, msg})
  }
  const clearList = () => {
    showAlert(true, '😑 empty list', 'danger')
    setList('')
  }
  const removeItem = (id) => {
    showAlert(true, '😑 item removed', 'danger')
    setList(list.filter((lists) => lists.id !== id
    ))
  }
  const editItem = (id) =>{
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
        <section className='section-center'>
            <form className='grocery-form' onSubmit={handleSubmit}>
              {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
              <h3>grocery bud</h3>
              <div className='form-control'>
                <input type='text' className='grocery' placeholder='e.g bread, tea ' value={name} onChange={(e) => {setName(e.target.value)}}/>
                <button type='submit' className='submit-btn'>
                   {isEditing ? 'edit' : 'submit'}
                </button>
              </div>
            </form>
           {list.length > 0 && (
              <div className='grocery-container'>
              <List items={list} removeItem={removeItem} editItem={editItem}/>
             <button className='clear-btn' onClick={clearList}>clear items</button>
            </div>
   
           )}

        </section>
    )
}

export default App
