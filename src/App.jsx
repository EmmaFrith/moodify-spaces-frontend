import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Sign-up'
import Signin from './components/Sign-in'
import ShowItem from './components/Show-item'
import AddItem from './components/Add-item'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/items/:id" element={<ShowItem />}/>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
