import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { Dropdown } from 'react-bootstrap';

const { io } = require("socket.io-client");
const socket = io('http://localhost:4000');
// stopPropagation is used for default closing of dropdown
// i put the key to math.random(), it just make the page run on every state change(doubt)

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];



const CreateRequest = () => {
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [flag,setFlag]=useState(false);
    const {setSock}=useContext(UserContext);
    const [processed,setProcessed]=useState("");
    const [users,setUsers]=useState([]);
    const [selectUsers,setSelectUsers]=useState([]);
    

    useEffect(()=>{
        fetch('http://localhost:4000/getUsers',{
            method:'GET',
            credentials:'include',
        }).then(response=>response.json())
        .then(data=>setUsers(data))
        .catch(error => console.error('Error fetching users:', error))
    },[])
    
    const userLength=users.length;
    const [checker,setChecker]=useState(Array(10).fill(false));
    

    const handleUserSelection=(e,position)=>{
        e.preventDefault();
        
        const updatedChecker=checker.map((input,index)=>{
            if(index===position){
                if(input!==false){
                    return false;
                }else{
                    return e.target.value;
                }
            }else{
               return input; 
            }
        })
        setChecker(updatedChecker);
    }


    //differnce between form data and json data
    const handlePost=async(e)=>{
        e.preventDefault();
        // console.log(data);
        const response=await fetch('http://localhost:4000/pull-request',{
            method:'POST',
            body:JSON.stringify({title,content,checker,processed}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
        if(response.ok){
            setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to="/pull-request" />
    }
    

    return (

    <div className='newPost-body'>
    <form className="newPost" onSubmit={handlePost}>

        <h1 className='newPost-head'>Create Request</h1>
        <div className="input-group newpost">
            <input type="text" 
                    className="form-control" 
                    placeholder="Title" 
                    aria-label="Title" 
                    aria-describedby="addon-wrapping"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        
        
        <ReactQuill id="floatingTextarea1"
                    value={content} 
                    onChange={newValue=>setContent(newValue)}
                    modules={modules}
                    formats={formats}
        ></ReactQuill>

        { /** dropdown */}
        <form className='newpost select'>
            <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select Approvers
                </Dropdown.Toggle>
        

                <Dropdown.Menu>
                {users.length && users.map((user,index)=>(
                    <Dropdown.Item key={Math.random()} onClick={(e)=>e.stopPropagation()}>
                        <div className="form-check">
                        <input className="form-check-input" 
                                type="checkbox" 
                                value={user._id} 
                                checked={checker[index]}
                                id="checkbox-list"
                                name="checkbox-list"
                                onChange={(e) => handleUserSelection(e,index)} />
                        <label className="form-check-label" htmlFor="checkbox-list">
                            {user.username}
                        </label>
                        </div>
                    </Dropdown.Item>
                ))}
                    
                </Dropdown.Menu>
            </Dropdown>                                                          
        </form>

        { /** selecters */}
        <div className='processed'>
            <label htmlFor='parallel'>Parallel<input style={{marginRight:'20px',marginLeft:'5px'}} type='radio' id='parallel' name="1" value="parallel" onChange={(e)=>setProcessed(e.target.value)}/></label>
            <label htmlFor='sequential'>Sequential<input  style={{marginRight:'20px',marginLeft:'5px'}} type='radio' id='sequential' name="1" value="sequential" onChange={(e)=>setProcessed(e.target.value)}/></label>
        </div>

        <div className='newpost'>
            <button className="btn btn-outline-secondary newPost-btn" type="submit">Create</button>
        </div>
        
    </form>
    
    </div>
  )
}

export default CreateRequest