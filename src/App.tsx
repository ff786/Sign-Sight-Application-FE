import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConversionPage from './Components/audio-sign/ConversionPage'
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/common/Navbar'
import Footer from './Components/common/Footer'

import MentorLogin from "./pages/kaveesha/MentorLogin";
import MentorSignUp from "./pages/kaveesha/MentorSignUp";
import StudentLogin from "./pages/kaveesha/StudentLogin";
import StudentSignUp from "./pages/kaveesha/StudentSignUp";
import StudentLearningLanding from "./pages/kaveesha/StudentLanding";
import QuizEngine from "./pages/kaveesha/learn/QuizEngine";
import Results from "./pages/kaveesha/ResultPage";
import LessonsHome from "./pages/kaveesha/lessons/LessonsHome";

import LessonPlayer from "./pages/kaveesha/lessons/LessonsPlayer";
import MentorDashboard from "./mentor/MentorDashboard";
import AdminLogin from "./pages/kaveesha/AdminLogin";
import AdminDashboard from "./pages/kaveesha/AdminDashboard";
import StudentAttemptsPage from "./pages/kaveesha/StudentAttemptsPage";

import Emotion_landing from "./pages/hasadara/Emotion_Landing";
import Instructions from "./pages/hasadara/Instructions";
import EmotionFlow from "./pages/hasadara/EmotionFlow";
import Result from "./pages/hasadara/Result";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Home" element={<HomePage />} />
        <Route path="/convert" element={<ConversionPage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<StudentLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignUp />} />
        <Route path="/student/landing" element={<StudentLearningLanding />} />
        <Route path="/student/attempts" element={<StudentAttemptsPage />} />
        <Route path="/mentor/login" element={<MentorLogin />} />
        <Route path="/mentor/signup" element={<MentorSignUp />} />
        <Route path="/results" element={<Results />} />

        <Route path="/learn/:level" element={<QuizEngine />} />

        <Route path="/lessons" element={<LessonsHome />} />

        <Route path="/lessons" element={<LessonsHome />} />
        <Route path="/lessons/:category/:item" element={<LessonPlayer />} />
        <Route path="/mentorDash" element={<MentorDashboard />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/emotion_landing" element={<Emotion_landing />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/emotion" element={<EmotionFlow />} />
          <Route path="/result" element={<Result />} />
        {/* <Route path="/lessons/food/:food" element={<FoodPlayer />} />
        <Route path="/lessons/numbers/:number" element={<NumberViewer />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
