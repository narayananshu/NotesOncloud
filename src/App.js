import Navbar from './component/Navbar';
import './App.css';
import Home from './component/Home';
import About from './component/About';
 import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import NoteState from './context/notes/notestate';

function App() {
  
  return (
  <>

  <NoteState>
  <Router>
    <Navbar/>
    <div className="container">

    
    <Routes>
    <Route exact path="/"  element={<Home/>}/>
    <Route exact path="/about" element={<About/>}/>
    </Routes>
    </div>
   </Router>
  </NoteState>
   </>
  )
}

export default App;