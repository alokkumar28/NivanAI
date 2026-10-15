import { signInWithPopup } from "firebase/auth";
import api from "../../utils/axios";
import { auth, googleProvider } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserdata } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
import NivanIcon from "../../public/NivanIcon";

function Login() {
  const dispatch = useDispatch();
  const handleLogin = async (token) => {
    try {
      const response = await api.post("/api/auth/login", { token });
      dispatch(setUserdata(response));
      return response.data;
    } catch (error) {
      console.error("Backend login request failed");
      console.error("Message:", error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await handleLogin(token);
    } catch (error) {
      console.error("LOGIN FLOW ERROR:", error);
      console.error("Error message:", error.message);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090F] px-4">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px] md:h-80 md:w-80 md:blur-[120px]" />
      <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-indigo-500/10 blur-[80px] md:h-40 md:w-40 md:blur-[100px]" />

      <div className="relative w-full max-w-[22rem] rounded-2xl border border-[#272735] bg-[#13131D]/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl md:max-w-[20rem] md:p-8">
        <div className="mb-6 flex justify-center md:mb-7">
          <div className="flex items-center gap-3">
            <NivanIcon size={36} />
            <span className="text-lg font-semibold text-[#F4F4F5]">
              Nivan<span className="text-[#A78BFA]">AI</span>
            </span>
          </div>
        </div>

        <div className="mb-6 text-center md:mb-8">
          <h1 className="text-xl font-semibold tracking-tight text-[#F4F4F5] md:text-2xl">
            Welcome to Nivan AI
          </h1>
          <p className="mt-2 text-xs leading-5 text-[#9292A5] md:mt-3 md:text-sm md:leading-6">
            Your intelligent multi-agent workspace. Sign in to build,
            collaborate, and automate with AI.
          </p>
        </div>

        <button
          type="button"
          onClick={googleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#272735] bg-white px-4 py-2.5 text-sm font-medium text-[#18181B] transition hover:bg-gray-100 active:scale-[0.98] md:py-3"
        >
          <FcGoogle className="text-lg md:text-xl" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-[10px] text-[#9292A5] md:mt-6 md:text-xs">
          By continuing, you agree to our{" "}
          <a href="#" className="text-violet-400 hover:text-violet-300">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-violet-400 hover:text-violet-300">
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <p className="absolute bottom-6 text-xs tracking-wide text-[#9292A5]/60">
        Nivan AI · Intelligent by design
      </p>
    </div>
  );
}

export default Login;
