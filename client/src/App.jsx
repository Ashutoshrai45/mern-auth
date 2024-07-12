import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Signuppage from "./pages/signup";
import ProfilePage from "./pages/profile";
import Header from "./components/header";
import Signin from "./pages/signin";
import Privateroute from "./components/privateroute";
function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signuppage />}></Route>
        <Route element={<Privateroute />}>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
