import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div className="bg-cyan-100">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="text-teal-600 font-bold text-4xl"> Ash</h1>
        <ul className="flex gap-9">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {currentuser ? (
            <Link to="/profile">
              <img
                src={currentuser.profilePicture}
                alt="profilephoto"
                className="w-8 h-8 rounded-full object-cover "
              />
            </Link>
          ) : (
            <>
              <Link to="/signin">Signin</Link>
              <Link to="/sign-up">SignUp</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
