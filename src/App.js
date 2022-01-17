// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Vendor from './Componenets/vendor/Vendor';
import Tabs from './Componenets/Tabs/Tabs';
import Signup from "./Componenets/SignUp/Signup";
import Login from "./Componenets/Login/LoginForm";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router >
        <ul className="container nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/tabs">Tabs</a>
          </li>   
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/signup">Sign up</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/login">Log in</a>
          </li>       
        </ul>
        <Routes>
          <Route exact path='/' element={<Vendor />} />
          <Route exact path='/tabs' element={<Tabs />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login/>} />
        </Routes>
      </Router>

    </>
  );
}
export default App;