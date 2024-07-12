import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinStart, signinSuccess, signinfailure } from "../store/userstore";
import { useDispatch, useSelector } from "react-redux";
import GoogleAuth from "../components/oauth";

const Signin = () => {
  const [formdata, setformdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const Handlesubmitdata = async (e) => {
    e.preventDefault();
    try {
      Dispatch(signinStart());
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(signinfailure(data));
        return;
      }
      Dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      Dispatch(signinfailure(error));
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <p className="text-red-500 my-1 text-center underline ">
        {error ? error.errMessage || "Something went wrong" : ""}
      </p>
      <h1 className="text-3xl font-semibold text-center my-7">SignIn</h1>
      <form className="flex flex-col gap-4" onSubmit={Handlesubmitdata}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handlechange}
          className="bg-slate-200 rounded-lg pl-4 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlechange}
          className="bg-slate-200 rounded-lg pl-4 py-2"
        />
        <button className=" bg-violet-500 p-2 rounded-2xl font-semibold uppercase hover:opacity-95 disabled:opacity-80 ">
          {loading ? "loading" : "Signin"}
        </button>
        <GoogleAuth></GoogleAuth>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Don&#39;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-red-700 font-semibold">SignUp</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
