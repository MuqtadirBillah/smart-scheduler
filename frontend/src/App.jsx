import logo from './logo.svg';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login';
import Project from './pages/Project';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import CreateProjectPage from './pages/CreateProject';

function App() {
  return (
    <div>
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
      <Router>
        <Routes>
          <Route  path="/"  element={<Home />} />
          <Route  path="/login"  element={<Login />} />
          <Route  path="/project/:id"  element={<Project />} />
          <Route  path="/project/create"  element={<CreateProjectPage />} />
          {/* <Route  path="*"  element={<PageNotFound />} /> */}
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
