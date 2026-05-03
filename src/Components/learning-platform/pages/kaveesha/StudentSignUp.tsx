import Navbar from "../../components/Navbar";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../../../../firebase";
import axios from "axios";
import Toast from "../../components/Toast";
import { useToast } from "../../../../hooks/useToast";

export default function StudentSignup() {
  const nav = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    let firebaseUser = null;
    try {
      setLoading(true);

      // Step 1: Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      firebaseUser = userCred.user;

      // Step 2: Save to MongoDB
      await axios.post("/api/students", {
        username,
        name,
        email,
        age: parseInt(age),
        gender,
        firebaseUid: firebaseUser.uid,
      });

      showToast("Account created successfully! 🎉", "success");
      setTimeout(() => nav("/student/login"), 900);
    } catch (err: any) {
      // If Firebase Auth succeeded but MongoDB failed, delete the auth user
      // so the student can retry without getting "email already in use"
      if (firebaseUser) {
        try { await deleteUser(firebaseUser); } catch (_) {}
      }
      showToast(getErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  function getErrorMessage(error: any) {
    // Axios/server errors
    if (error?.response) {
      return error.response.data?.message || "Server error. Please try again 🌐";
    }

    const code = error?.code || "";
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered 📧";
      case "auth/invalid-email":
        return "Please enter a valid email address ✉️";
      case "auth/weak-password":
        return "Password must be at least 6 characters 🔐";
      case "auth/network-request-failed":
        return "Network error. Check your connection 🌐";
      default:
        return "Something went wrong. Please try again 😕";
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
    <div className="min-h-screen bg-gradient-to-br from-peach via-orange-100 to-pink-100">
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
      <Navbar />

      <section className="relative max-w-xl mx-auto px-4 py-8 pb-20">
        {/* glows */}
        <div className="absolute top-0 left-12 w-28 h-28 bg-yellow-300/30 blur-2xl rounded-full animate-pulse" />
        <div className="absolute bottom-24 right-14 w-36 h-36 bg-pink-300/30 blur-2xl rounded-full animate-pulse" />

        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-5xl p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-center mb-2">
            <span className="text-orange-600">Student</span>{" "}
            <span className="text-pink-500">Sign Up</span>
          </h2>

          <p className="text-center text-gray-700 mb-6">
            Start your sign language journey 🌈
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-blue-300
                focus:outline-none focus:ring-4 focus:ring-blue-200
                text-center
              "
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-yellow-300
                focus:outline-none focus:ring-4 focus:ring-yellow-200
                text-center
              "
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-orange-300
                focus:outline-none focus:ring-4 focus:ring-orange-200
                text-center
              "
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="
                  w-full p-4 rounded-full border-2 border-pink-300
                  focus:outline-none focus:ring-4 focus:ring-pink-200
                  text-center
                "
              />

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="
                  w-full p-4 rounded-full border-2 border-purple-300
                  focus:outline-none focus:ring-4 focus:ring-purple-200
                  text-center
                "
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full p-4 rounded-full border-2 border-red-300
                focus:outline-none focus:ring-4 focus:ring-red-200
                text-center
              "
            />

            <div className="flex justify-center pt-4">
              <PrimaryButton
                disabled={
                  loading ||
                  username.length < 3 ||
                  name.length < 2 ||
                  !email.includes("@") ||
                  !age ||
                  !gender ||
                  password.length < 6
                }
                onClick={handleSignup}
              >
                {loading ? <Loader /> : "Create Student Account ✨"}
              </PrimaryButton>
            </div>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already a Student?{" "}
              <span
                onClick={() => nav("/student/login")}
                className="text-pink-500 font-semibold cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
