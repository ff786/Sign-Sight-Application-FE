import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import UnifiedNavbar from './Components/common/UnifiedNavbar'
import UnifiedFooter from './Components/common/UnifiedFooter'
import ProtectedRoute from './Components/common/ProtectedRoute'

//import DynamicNavbar from './Components/Dynamic-Component/DynamicNavbar'
import DynamicHome from './Components/Dynamic-Component/DynamicHome'
import RealTime from './Components/Dynamic-Component/Realtime.tsx'
import Upload from './Components/Dynamic-Component/Upload'
// Pages
import LandingPage from './pages/LandingPage'
import UnifiedLoginPage from './pages/auth/UnifiedLoginPage'
import UnifiedSignupPage from './pages/auth/UnifiedSignupPage'
import ProfilePage from './pages/ProfilePage'
import ConversionPage from './Components/audio-sign/ConversionPage'
import HomePage from './Components/HomePage/HomePage'
import AboutUs from './pages/AboutUs'

// Legacy imports
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
        <AuthProvider>
            <BrowserRouter>
                <UnifiedNavbar/>
                <main className="min-h-screen">
                    <Routes>
                        {/* Main Landing & Auth - Public */}
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="/login" element={<UnifiedLoginPage/>}/>
                        <Route path="/signup" element={<UnifiedSignupPage/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>

                        {/* Mentor Routes */}
                        <Route path="/mentor/login" element={<MentorLogin/>}/>
                        <Route path="/mentor/signup" element={<MentorSignUp/>}/>

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin/>}/>
                        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>

                        {/* Primary Features - No auth required for viewing */}
                        <Route path="/convert" element={<ConversionPage/>}/>
                        <Route path="/emotion_landing" element={<Emotion_landing/>}/>
                        <Route path="/detection"
                               element={<div className="p-8 text-center text-2xl">Live Sign Detection Coming
                                   Soon</div>}/>

                        {/* Protected Features - Require auth */}
                        <Route
                            path="/lessons"
                            element={
                                <ProtectedRoute>
                                    <LessonsHome/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/lessons/:category/:item"
                            element={
                                <ProtectedRoute>
                                    <LessonPlayer/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/learn/:level"
                            element={
                                <ProtectedRoute>
                                    <QuizEngine/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/landing"
                            element={
                                <ProtectedRoute>
                                    <StudentLearningLanding/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/student/attempts"
                            element={
                                <ProtectedRoute>
                                    <StudentAttemptsPage/>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/mentorDash"
                            element={
                                <ProtectedRoute requiredRole="mentor">
                                    <MentorDashboard/>
                                </ProtectedRoute>
                            }
                        />

                        {/* Legacy Routes */}
                        <Route path="/Home" element={<HomePage/>}/>
                        <Route path="/aboutus" element={<AboutUs/>}/>
                        <Route path="/student/login" element={<StudentLogin/>}/>
                        <Route path="/student/signup" element={<StudentSignUp/>}/>
                        <Route path="/results" element={<Results/>}/>
                        <Route path="/instructions" element={<Instructions/>}/>
                        <Route path="/emotion" element={<EmotionFlow/>}/>
                        <Route path="/result" element={<Result/>}/>

                        {/*Dynamic-Live-Detection*/}
                        <Route path="/Dynamic-Home" element={<DynamicHome/>}/>
                        <Route path="/real-time" element={<RealTime/>}/>
                        <Route path="/upload" element={<Upload/>}/>

                        {/* Catch all */}
                        <Route path="*" element={<Navigate to="/" replace/>}/>
                    </Routes>
                </main>
                <UnifiedFooter/>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
