
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Edit(){

    
    const todo = JSON.parse(sessionStorage.getItem("todo"));
    const navigate = useNavigate();
    const [ title , setTitle ] = useState(todo.title);
    const [ status , setStatus ] = useState(todo.status);
    

    function edit(status){
        const st = {
            title,
            status
        }
        axios.put(`http://localhost:8070/todo/edit/${todo._id}` , st).then((res) =>{
            setStatus(status);
            setTimeout(() => {
                toast.success('Todo Edited!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
              }, 5000);

              navigate('/home');

        }).catch((err) =>{
            console.log(err);
        })
    }
    return(
        <div>
            <input type="text" value = {title} disabled />

            <br />
               
                <select value={status} onChange={(e)=>{edit(e.target.value)}} class="form-control form-select" style ={{width:"12rem"}} required>
                    <option>In Progress</option>
                    <option>Pending</option>
               
                </select>
                <ToastContainer></ToastContainer>
        </div>

    )
}

export default Edit;