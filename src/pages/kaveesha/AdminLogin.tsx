import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../components/kaveesha/Toast";
import { useToast } from "../../hooks/useToast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  function login() {
    if (username === "admin" && password === "admin123") {
      showToast("Welcome, Admin! 🛡️", "success");
      setTimeout(() => nav("/admin/dashboard"), 900);
    } else {
      showToast("Invalid username or password 🔒", "error");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={hideToast} />}
      <div className="bg-white p-8 rounded-xl shadow-xl space-y-4 w-80">
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={login}
          className="w-full bg-black text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
