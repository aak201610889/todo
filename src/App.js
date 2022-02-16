import React, { useEffect, useState } from 'react'
import Alert from './Alert'
import List from './List'

const getLocalStorage = () => { 
  let list = localStorage.getItem("list");
  if (list) { 
    return JSON.parse(list);
  }
  return [];
}

function App() {
  const [Name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [IsEdit, setIsEdit] = useState(false);
  const [EditID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Name) { 
    showAlert(true,"danger", "Please enter a name");
    }
    if (Name && IsEdit) { 
      
      setList(list.map((item) => (
        item.id === EditID ? { ...item, title: Name } : item)));
      setName("");
      setIsEdit(false);
      setEditID(null);
      showAlert(true,"success", "Item updated");


    }
    else {
      if (Name.length > 0) {
      showAlert(true,"success", "Item added");
      const newItem = { id:new Date().getTime().toString(), title: Name };
        setList([...list,newItem]);
        setName("");
      }
    }
  };
  const clearList=()=>{ 
    showAlert(true, "success", "List cleared");
    setList([]);
  }
  const clearItem = (id) => {
    setList(list.filter((item) => item.id !== id)); 
    showAlert(true, "success", "Item removed")
    }
  // TODO:replace Name to Todo
  const editItem = (id) => { 
    const specificItem = list.find((item) => item.id === id);
    setIsEdit(true);
    setEditID(id);
    setName(specificItem.title);
  }
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    
  }, [list])
  
  return (
    <div className="app">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={ list} />}

        <input
          type="text"
          placeholder="todo item"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        {Name}
        <button type="submit">{IsEdit ? "edit " : "submit"}</button>
      </form>
      {list.length > 0 && (
        <div>
          <List items={list} clearItem={clearItem} editItem={ editItem} />
          <button onClick={clearList}>clear item</button>
        </div>
      )}
    </div>
  );
}

export default App