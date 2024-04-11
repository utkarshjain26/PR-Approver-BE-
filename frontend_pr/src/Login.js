import loginImg from './images/loginImg.jpg';
import { useContext,useState } from 'react';
import { UserContext } from './UserContext';
import {Link, Navigate,useNavigate} from 'react-router-dom';

const Login = () => {
  const [redirect,setRedirect]=useState(false);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const {setUserInfo} = useContext(UserContext);

    const login=async (e)=>{
        e.preventDefault();
        const response= await fetch('http://localhost:4000/login',{
        method:'POST',
        body:JSON.stringify({username,password}),
        headers:{'Content-Type':'application/json'},
        credentials:'include'
    });

    if(response.ok){
        response.json().then(info=>{
        setUserInfo(info);
        setRedirect(true);
    })
    }
    else{
        alert('Wrong credentials');
    }
    }

    if(redirect){
        return <Navigate to='/pull-request' />
    }

  return (
        <div className='login-page'>
            <h1 className='login-heading'>Sign in to account</h1>
            <div class="login-container">
                <form className='login-form' onSubmit={login}>
                    <label htmlFor="exampleInputText" className="form-label">Username</label>
                    <input type="text" 
                            id="exampleInputText"
                            aria-describedby="emailHelp" 
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            required />
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" 
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required />
                    <button className='home-button' type='submit'>Sign In</button>
                </form>
            </div>
            <div class="signup">New to PR Approver? <Link to={'/register'} className='signup-link'>Create an account</Link></div>
        </div>
  )
}

export default Login