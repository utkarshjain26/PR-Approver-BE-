import Content from './Content';
import Request from './Request';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import { Route, Routes ,useHistory} from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import NewFormat from './NewFormat';
import CreateRequest from './CreateRequest';
import EditFormat from './EditFormat';
import Approved from './Approved';
import Rejected from './Rejected';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header/>

        <Routes>
          <Route path='/' element={<Content/>}>
          </Route>
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/register' element={<Register/>}>
          </Route>
          <Route path='/pull-request' element={<Request/>}>
          </Route>
          <Route path='/pull-request-approved' element={<Approved/>}>
          </Route>
          <Route path='/pull-request-rejected' element={<Rejected/>}>
          </Route>
          <Route path='/pull-request/:id' element={<NewFormat />}>
          </Route>
          <Route path='/newPullRequest' element={<CreateRequest />}>
          </Route>
          <Route path='/edit-pull-request/:id' element={<EditFormat />}>
          </Route>
        </Routes>

        <Footer/>
      </div>
    </UserContextProvider>
  );
}

export default App;
