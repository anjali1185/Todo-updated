import React , {useState , useEffect} from 'react'
import './style.css';
// import AddIcon from '@mui/icons-material/Add';

const getLocalData = () =>{
    const lists = localStorage.getItem("todolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}
export default function Todo() {
    const [input,setInput] = useState("");
    const [item, setItem] = useState(getLocalData());
    const [editItem,setEditItem] = useState("");
    const [toggle,setToggle] = useState(false);
    const addItem = () =>{
        if(!input){
            alert('please fill the data');
        }
        else if(input && toggle){
            setItem(
                item.map((curElem)=>{
                    if(curElem.id === editItem){
                        return {... curElem, name:input};
                    }
                    return curElem;
                })
            )
            setInput("");
            setEditItem([]);
            setToggle(false);
            }else{
            const myNewInput = {
                id: new Date().getTime().toString(),
                name:input,
            };
            setItem([... item, myNewInput])
            setInput("");
        }
    }
    
    const editNewItem = (index) =>{
        const editedTodo = item.find((curElem)=>{
            return curElem.id === index;
        });
        setInput(editedTodo.name);
        setEditItem(index);
        setToggle(true);

    }
    const deleteItem = (index) =>{
        const updateItem = item.filter((curElem)=>{
            return curElem.id !== index
        })
        setItem(updateItem);
    }
    const removeAll = () =>{
        setItem([]);
    }
    useEffect(()=>{
        localStorage.setItem("todolist",JSON.stringify(item))
    },[item]);
    console.log(item);
  return (
    <div>
      <div className='main-div'>

        <div className='child-div'>
            <figure>
                <img src = "./images/todo.jpg" alt = "todologo"></img>
                <figcaption>Add your List here</figcaption>
            </figure>
            <div className='addItems'>
                <input type='text'
                placeholder='✍️ Add Item'
                className='form-control'
                value={input}
                onChange={(e) => setInput(e.target.value)}></input> 
                {(toggle ? (
                <i className='far fa-edit add-btn' onClick={addItem}></i>
                ):(
                    <i className='fa fa-plus add-btn' onClick={addItem}></i>
                )
              
            ) }
            
            </div>
            <div className='showItem'>
                {item.map((curElem,index) => {
                    return(
                    <div className='eachItem' key={index}>
                    <h3>{curElem.name}</h3>
                    <div className='todo-btn'>
                <i className='far fa-edit add-btn' onClick={()=>editNewItem(curElem.id)}></i>
                <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                        
                    </div>
                </div>
                    )
                })}
                
                
            </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text = "Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}
