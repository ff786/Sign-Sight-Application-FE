import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Dynamic-Component/Navbar';
import Home from './Dynamic-Component/Home.jsx';
import RealTime from './Dynamic-Component/RealTime.jsx';
import Upload from './Dynamic-Component/Upload.jsx';

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/real-time" element={<RealTime />} />
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App;
