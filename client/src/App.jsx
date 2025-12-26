import { useEffect,useState, createContext } from 'react';
import Login from './pages/Login';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';
import Question from "./pages/questionPage/Question";

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser(){
     if (!token) {
      navigate("/login");
      return;
    }
      try {
        const {data} = await axios.get("/users/check", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error?.response || error.message);
        navigate("/login");
      }
    }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value = {{user, setUser}}>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ask" element={<Question />} />
        </Routes>
    </AppState.Provider>
  );   
}

export default App;
