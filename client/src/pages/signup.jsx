import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/oauth";

const Signuppage = () => {
  const [formdata, setformdata] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const Handlesubmitdata = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      seterror(false);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log(data);
      setloading(false);
      if (data.success === false) {
        seterror(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <p className="text-red-500 my-1 text-center underline ">
        {error && "Something went wrong"}
      </p>
      <h1 className="text-3xl font-semibold text-center my-7">SignUp</h1>
      <form className="flex flex-col gap-4" onSubmit={Handlesubmitdata}>
        <input
          type="text"
          placeholder="Username"
          id="fullname"
          className="bg-slate-200 rounded-lg pl-4 py-2"
          onChange={handlechange}
        />
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
        <p>Already have an account?</p>
        <Link to="/signin">
          <span className="text-red-700 font-semibold">Signin</span>
        </Link>
      </div>
    </div>
  );
};

export default Signuppage;
