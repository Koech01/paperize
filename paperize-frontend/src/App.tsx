import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Home/>}/>
          <Route  path='*' element={<NotFound/>}/> 
          <Route  path='/login/' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App