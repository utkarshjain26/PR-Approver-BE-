import { Route, Routes ,useHistory} from 'react-router-dom';
import { UserContextProvider } from './UserContext';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ApprovedRequest from './pages/Request/ApprovedRequest';
import RejectedRequests from './pages/Request/RejectedRequest';
import PendingRequest from './pages/Request/PendingRequest';
import ViewRequest from './pages/Request/ViewRequest';
import CreateRequest from './pages/Request/CreateRequest';
import EditRequest from './pages/Request/EditRequest';
import Footer from './shared/Footer';
import Header from './shared/Header';
import HomeLogin from './pages/Home/HomeLogin';
import NotificationPage from './shared/NotificationPage';


function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header/>

        <Routes>
          <Route path='/' element={<Home/>}>
          </Route>
          <Route path='/requests' element={<HomeLogin/>}>
          </Route>
          <Route path='/login' element={<Login/>}>
          </Route>
          <Route path='/register' element={<SignUp/>}>
          </Route>
          <Route path='/pull-request' element={<PendingRequest/>}>
          </Route>
          <Route path='/pull-request-approved' element={<ApprovedRequest/>}>
          </Route>
          <Route path='/pull-request-rejected' element={<RejectedRequests/>}>
          </Route>
          <Route path='/pull-request/:id' element={<ViewRequest />}>
          </Route>
          <Route path='/notifications' element={<NotificationPage />}>
          </Route>
          <Route path='/newPullRequest' element={<CreateRequest />}>
          </Route>
          <Route path='/edit-pull-request/:id' element={<EditRequest />}>
          </Route>
        </Routes>

        <Footer/>
      </div>
    </UserContextProvider>
  );
}

export default App;
