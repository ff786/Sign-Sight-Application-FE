import Navbar from "../../Components/kaveesha/Navbar";
import PrimaryButton from "../../Components/kaveesha/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { MENTOR_BASE_URI } from "../../config/CONFIG";
import Toast from "../../Components/kaveesha/Toast";
import { useToast } from "../../hooks/useToast";

export default function MentorSignup() {
  const nav = useNavigate();
  const { toast, showToast, hideToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    try {
      setLoading(true);

      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await axios.post(MENTOR_BASE_URI + "/api/mentors", {
        name,
        email,
        firebaseUid: userCred.user.uid,
      });

      localStorage.clear();
      localStorage.setItem("mentorEmail", email);
      showToast("Account created successfully! 🎉", "success");
      setTimeout(() => nav("/mentorDash"), 900);
    } catch (err: any) {
      showToast(getFirebaseErrorMessage(err), "error");
    } finally {
      setLoading(false);
    }
  }

  function Loader() {
    return (
      <div className="flex justify-center items-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  function getFirebaseErrorMessage(error: any) {
    const code = error?.code || "";

    switch (code) {
      case "auth/weak-password":
        return "Password must be at least 6 characters 🔐";
      case "auth/email-already-in-use":
        return "This email is already registered 📧";
      case "auth/invalid-email":
        return "Please enter a valid email address ✉️";
      case "auth/network-request-failed":
        return "Network error. Check your connection 🌐";
      default:
        return "Something went wrong. Please try again 😕";
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50">
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
      <Navbar />

      <section className="relative max-w-xl mx-auto px-4">
        {/* glows */}
        <div className="absolute top-0 left-12 w-28 h-28 bg-yellow-200 rounded-full opacity-40" />
        <div className="absolute bottom-24 right-14 w-36 h-36 bg-amber-200 rounded-full opacity-40" />

        <div className="relative bg-white rounded-[2.5rem] shadow-lg p-8 sm:p-12 border border-yellow-100">
          <h2 className="text-3xl font-extrabold text-center mb-2">
            <span className="text-yellow-800">Mentor</span>{" "}
            <span className="text-stone-800">Sign Up</span>
          </h2>

          <p className="text-center text-gray-700 mb-8">
            Help children learn sign language 🌈
          </p>

          <div className="space-y-5">
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

            <div className="flex justify-center pt-6">
              <PrimaryButton
                disabled={
                  loading ||
                  name.length < 2 ||
                  !email.includes("@") ||
                  password.length < 6
                }
                onClick={handleSignup}
              >
                {loading ? <Loader /> : "Create Mentor Account ✨"}
              </PrimaryButton>
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already a mentor?{" "}
              <span
                onClick={() => nav("/mentor/login")}
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
