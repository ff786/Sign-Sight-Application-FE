import Navbar from "../../Components/kaveesha/Navbar";
import PrimaryButton from "../../Components/kaveesha/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import Toast from "../../Components/kaveesha/Toast";
import { useToast } from "../../hooks/useToast";

export default function StudentLogin() {
  const nav = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const { data: studentData } = await axios.get(
        `/api/students/by-username/${username}`
      );

      if (!studentData) {
        showToast("Username not found 👀", "error");
        setLoading(false);
        return;
      }

      await signInWithEmailAndPassword(auth, studentData.email, password);

      localStorage.setItem("studentName", studentData.username);
      localStorage.setItem("studentUserId", studentData._id);
      localStorage.setItem("studentFullName", studentData.name);
      localStorage.setItem("studentEmail", studentData.email);

      showToast("Welcome back! 🎉", "success");
      setTimeout(() => nav("/student/landing"), 900);
    } catch (err: any) {
      showToast(getFirebaseErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  function getFirebaseErrorMessage(error: any) {
    // Axios HTTP errors (e.g. 404 username not found)
    if (error?.response) {
      const status = error.response.status;
      if (status === 404) return "Username not found 👀";
      if (status === 500) return "Server error. Try again later 🌐";
      return error.response.data?.message || "Login failed. Please try again 😕";
    }

    const code = error?.code || "";
    switch (code) {
      case "auth/user-not-found":
        return "No account found 👀";
      case "auth/wrong-password":
        return "Incorrect password 🔑";
      case "auth/invalid-email":
        return "Invalid credentials ✉️";
      case "auth/network-request-failed":
        return "Network error. Try again 🌐";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later ⏰";
      default:
        return "Login failed. Please try again 😕";
    }
  }

  function Loader() {
    return (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
      <Navbar />

      <section className="relative max-w-xl mx-auto px-4 py-20">
        {/* glows */}
        <div className="absolute top-10 left-10 w-28 h-28 bg-yellow-200 rounded-full opacity-40" />
        <div className="absolute bottom-20 right-12 w-32 h-32 bg-amber-200 rounded-full opacity-40" />

        <div className="relative bg-white rounded-[2.5rem] shadow-lg p-8 sm:p-12 border border-yellow-100">
          <h2 className="text-3xl font-extrabold text-center mb-2">
            <span className="text-yellow-800">Student</span>{" "}
            <span className="text-stone-800">Login</span>
          </h2>

          <p className="text-center text-gray-700 mb-8">
            Welcome back 💛 Continue your learning journey
          </p>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-orange-300
                focus:outline-none focus:ring-4 focus:ring-orange-200
                text-center
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-pink-300
                focus:outline-none focus:ring-4 focus:ring-pink-200
                text-center
              "
            />

            <div className="flex justify-center pt-4">
              <PrimaryButton
                disabled={loading || username.length < 3 || password.length < 6}
                onClick={handleLogin}
              >
                {loading ? <Loader /> : "Login as Student 🚀"}
              </PrimaryButton>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              New Student?{" "}
              <span
                onClick={() => nav("/student/signup")}
                className="text-pink-500 font-semibold cursor-pointer underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
