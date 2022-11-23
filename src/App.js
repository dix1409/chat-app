
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
  
} from "react-router-dom";
import HomeScreen from "./Screen/HomeScreen";
import Login from "./Screen/Login";
import LoadScreen from "./Screen/LoadScreen";
import Chat from "./Screen/Chat";



function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoadScreen/>} />
      <Route path="/home"  element={<HomeScreen/>} />
    
      <Route path="/login" element={<Login/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
  </BrowserRouter> ;
}

export default App;
