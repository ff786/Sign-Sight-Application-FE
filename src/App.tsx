import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConversionPage from './Components/audio-sign/ConversionPage'
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/common/Navbar'
import Footer from './Components/common/Footer'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/convert" element={<ConversionPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
