import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../store/userstore";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const handlegoogleclick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      Dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("user cannot login via google ", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handlegoogleclick}
      className="bg-red-500 text-white rounded-2xl p-2 hover:opacity-95 uppercase font-semibold"
    >
      Continue with google
    </button>
  );
};

export default GoogleAuth;
