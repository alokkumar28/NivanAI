import { useEffect } from "react";
import getCurrentUser from "./features/getCurrentUser";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setUserdata } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUserdata(data));
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };
    getUser();
  }, [dispatch]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
