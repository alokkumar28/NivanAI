import { signInWithPopup } from "firebase/auth";
import api from "../../utils/axios";
import { auth, googleProvider } from "../../utils/firebase";



function Home() {
  const handleLogin = async (token) => {
    try {
      console.log("1. handleLogin called");
      console.log("2. API base URL:", api.defaults.baseURL);

      const response = await api.post("/api/auth/login", { token });

      console.log("3. Backend status:", response.status);
      console.log("4. Backend response:", response.data);

      return response.data;
    } catch (error) {
      console.error("Backend login request failed");
      console.error("Message:", error.message);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      console.error("Request URL:", error.config?.url);
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      console.log("1. Starting Google login");

      const result = await signInWithPopup(auth, googleProvider);
      console.log("2. Google sign-in completed");

      console.log("3. User:", result.user.email);

      const token = await result.user.getIdToken();
      console.log("4. ID token obtained");

      console.log("5. Calling handleLogin now");
      await handleLogin(token);

      console.log("6. Backend login completed");
    } catch (error) {
      console.error("LOGIN FLOW ERROR:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <button className="w-50 h-25 bg-white" onClick={googleLogin}>
        Continue With Google
      </button>
    </div>
  );
}

export default Home;
