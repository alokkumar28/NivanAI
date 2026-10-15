import { useSelector } from "react-redux";
import Login from "./Login";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return <>{!userData && <Login />}</>;
}

export default Home;
