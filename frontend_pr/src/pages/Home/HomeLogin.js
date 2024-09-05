import {Link} from 'react-router-dom';
 
const HomeLogin = () => {
  return (
    <div className='home-body'>
      <h1 className='home-heading'>Requests</h1>
      <div className='home-show-btn'>
        <Link to="/pull-request"><button className='home-button'>Pending</button></Link>
        <Link to="/pull-request-approved"><button className='home-button'>Approved</button></Link>
        <Link to="/pull-request-rejected"><button className='home-button'>Rejected</button></Link>
      </div>
      
    </div>
  )
}

export default HomeLogin;