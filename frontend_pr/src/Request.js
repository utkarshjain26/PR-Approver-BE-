import { useEffect,useState,useContext } from "react";
import { UserContext } from "./UserContext";
import Format from "./Format"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const { io } = require("socket.io-client");
const socket = io('http://localhost:4000');

const Request = () => {
  const [posts,setPosts]=useState([]);
  const {userInfo,setRefresh,sock,popupOpen,setPopupOpen}=useContext(UserContext);
  const [flag,setFlag]=useState(false);

  
  const getPost=()=>fetch('http://localhost:4000/pull-request',{
      method:'GET',
      credentials:'include',
  }).then(response=>{
    response.json().then(post=>{
      setPosts(post);
      setRefresh(true);
    })
  });

 
  const handleClose = () => setPopupOpen(false);

  useEffect(()=>{
    getPost();
    socket.on(`newRequest${userInfo.id}`, (message) => {
      console.log(message);
      setPopupOpen(true);
    });
    
    socket.on(`sender${userInfo.id}`,(message)=>{
      console.log(message);
      setPopupOpen(true);
    })
  },[popupOpen])
  

  return (
    <div className="pull-body">
        {popupOpen && (
          <div> 
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>New Request! </Modal.Title>
              </Modal.Header>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>

            </Modal.Dialog>
          </div>
        )}
        
        {posts.length>0 && posts.filter(post=>(post.status==='Pending')).map(post=>(
            <Format {...post} />
        ))} 
        
        
    </div>
  );
}

export default Request



























// <div class="pagination-container">
          
//           <div class={currPage===1? "pagination-item disable":'pagination-item'} onClick={()=>changeCPage(currPage-1)}>Prev</div>
          
//           {posts.length>5 && <div className="pagination-counter">
//               {
//                 [...Array(posts.length/5)].map((_,i)=>{
//                   return <div 
//                               className={currPage===i+1?"pagination-item active":'pagination-item'} 
//                               key={i}
//                               onClick={()=>changeCPage(i+1)}>{i+1}</div>
//                 })
//               }
//             </div>}
          
//           <div class={currPage===posts.length/5?"pagination-item disable":'pagination-item'} onClick={()=>changeCPage(currPage+1)}>Next</div>
//         </div>