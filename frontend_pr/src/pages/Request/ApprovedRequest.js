import { useState,useEffect,useContext } from "react";
import { UserContext } from "../../UserContext";
import PullRequest from "../components/PullRequest";

const ApprovedRequest = () => {
    const [posts,setPosts]=useState([]);
    const {userInfo,setRefresh,sock}=useContext(UserContext);
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

    useEffect(()=>{
        getPost();
    },[posts])

  return (
    <div className="pull-body">
        {posts.length>0 && posts.filter(post=>(post.status==='Approved')).map(post=>(
            <PullRequest {...post} />
        ))} 
    </div>
  )
}

export default ApprovedRequest;