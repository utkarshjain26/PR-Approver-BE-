import registerImg from './images/registerImg.jpg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const register= async (e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:4000/register',{
          method:'POST',
          body:JSON.stringify({username,email,password}),
          headers:{'Content-Type':'application/json'}
        })
        setUsername('');
        setEmail('');
        setPassword('');
        if(!response.ok){console.log(`${response}`); alert('Registration Failed!')}
        else {alert('Registraiton successful')}
      }


      
  return (
    <div className='register-page'>
        <h2 className='register-heading'>Create your account</h2>
        <div class="register-container">
            <form className='register-form' onSubmit={register}>
                <label for="username" className="form-label">Username</label>
                <input type="text" 
                        className="form-control" 
                        id="exampleInputText" 
                        aria-describedby="emailHelp" 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required />
                <label for="email" className="form-label">Email</label>
                <input type="email" 
                      className="form-control" 
                      id="exampleInputEmail1" 
                      aria-describedby="emailHelp" 
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)} 
                      required />
                <label for="password" className="form-label">Password</label>
                <input type="password" 
                      className="form-control" 
                      id="exampleInputPassword1" 
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      required />
                <button className='home-button' type='submit'>Register</button>
            </form>
            <div class="login-link">Already have an account? <Link to={'/login'} className='login-link-line'>Login here</Link></div>
        </div>
    </div>
  )
}

export default Register