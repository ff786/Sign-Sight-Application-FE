import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Dynamic-Component/Navbar';
import Home from './pages/Home';
import RealTime from './pages/RealTime';
import Upload from './pages/Upload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-time" element={<RealTime />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;