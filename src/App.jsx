import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Sign-up'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/sign-up" element={<Signup />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
