import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate = useNavigate();
    const [ title , setTitle ] = useState("");
    const [ status , setStatus ] = useState(""); 
    const [ todos , setTodos ] = useState([]);
    const [ searchVal , setVal ] = useState("");

    useEffect(() =>{
        axios.get("http://localhost:8070/todo/").then((res) =>{
            console.log(res);
            setTodos(res.data);
        }).catch((err) =>{
            console.log(err);
        })
    });
    function addClick(e){
        e.preventDefault();
        console.log(title);
        const newTodo = {
            title
        }
        axios.post("http://localhost:8070/todo/add" , newTodo ).then((res) =>{
            console.log(res);
            
        }).catch((err)=>{
            console.log(err);
        });
    }

    function deleteClick(todo){
        if(
            window.confirm(
                "Are you sure that you want to remove " + todo.title + " ?"
            )
        )
        {
            axios.delete(`http://localhost:8070/todo/delete/${todo._id}`).then((res) =>{
                console.log(res);
            }).catch((err) =>{
                console.log(err);
            })

        }
    }

    function editClick(todo){
        sessionStorage.setItem("todo" , JSON.stringify(todo) );
        console.log(sessionStorage.getItem("todo"));
        navigate('/edit');
    }
    return(
        <div>
            <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Task Title" value={title} onChange={(e)=>{
                        setTitle(e.target.value);
                    }}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e)=>{
                    addClick(e);
                }}>
                    Add Task
                </Button>
            </Form>

            <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Search" value = {searchVal} onChange={(e) =>{
                        setVal(e.target.value);
                    }} />
                </Form.Group>
            </Form> 
            </div>

            <br />
            <div>
            <Table striped>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.filter((todo) =>{
                        if(searchVal === ""){
                            return todo;
                        }
                        else if (todo.title.toLowerCase().includes(searchVal.toLowerCase())){
                            return todo;
                        }
                    }).map((todo , index)=>(
                        <tr>
                        <td>{todo.title}</td>
                        <td>{todo.status}</td>
                        <td><Button variant="warning" onClick={() =>{
                            editClick(todo);
                            console.log(todo);
                        }}>Edit</Button>
                            <Button variant="danger" onClick={() =>{
                                deleteClick(todo)
                            }}>Delete</Button>
                        </td>
                    </tr>
                    ))}

                </tbody>
            </Table>    
            </div>
            </Container>
        </div>
    )
}

export default Home;