import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  updateUsersuccess,
  updateuserfailure,
  updateuserStart,
  deleteUsersuccess,
  deleteuserStart,
  deleteuserfailure,
  signout,
} from "../store/userstore";

const ProfilePage = () => {
  const Imageref = useRef(null);
  const [image, setimage] = useState(undefined);
  const [imageProgress, setimageprogress] = useState(0);
  const [imageError, setimageerror] = useState(false);
  const [formdata, setformdata] = useState({});
  const [updatesuccess, setUpdatesuccess] = useState(false);

  const { currentuser, loading, error } = useSelector((state) => state.user);

  const Dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const ImagefileName = new Date().getTime() + image.name;
    const storageref = ref(storage, ImagefileName);
    const uploadTask = uploadBytesResumable(storageref, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageprogress(Math.round(progress));
      },
      (error) => {
        setimageerror(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setformdata({ ...formdata, profilePicture: downloadURL })
        );
      }
    );
  };

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      Dispatch(updateuserStart());
      console.log("formdata:", formdata);
      console.log("URL:", `/api/update/${currentuser._id}`);
      const res = await fetch(`/api/update/${currentuser._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      if (!res.ok) {
        console.error("Response Status:", res.status);
        console.error("Response Text:", await res.text());
      }
      const data = await res.json();
      if (data.success === false) {
        Dispatch(updateuserfailure(data));
        return;
      }
      Dispatch(updateUsersuccess(data));
      setUpdatesuccess(true);
    } catch (error) {
      Dispatch(updateuserfailure(error));
      console.log(error);
    }
  };

  const handledeleteaccount = async () => {
    try {
      Dispatch(deleteuserStart());
      const res = await fetch(`/api/delete/${currentuser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        Dispatch(deleteuserfailure(data));
        return;
      }
      Dispatch(deleteUsersuccess());
    } catch (error) {
      Dispatch(deleteuserfailure(error));
    }
  };
  const handlesignout = async () => {
    try {
      await fetch("/api/signout");
      Dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <p className="text-red-500 my-1 text-center underline ">
        {error ? error.errMessage || "Something went wrong" : ""}
      </p>
      <p className="text-green-500 my-1 text-center underline">
        {updatesuccess && "User is updated successfully"}
      </p>
      <h2 className="text-3xl text-center my-4 font-normal">Profile</h2>
      <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
        <input
          type="file"
          id="profilePicture"
          ref={Imageref}
          accept="image/*"
          hidden
          onChange={(e) => {
            setimage(e.target.files[0]);
            setimageerror(false);
          }}
        />
        <img
          src={formdata.profilePicture || currentuser.profilePicture}
          alt="profilePhoto"
          id="profilePicture"
          className=" w-24 h-24 rounded-full  self-center object-cover cursor-pointer"
          onClick={() => Imageref.current.click()}
        />
        <p className="text-sm text-center font-semibold">
          {imageError ? (
            <span className="text-red-500 ">
              Error uploading image (only supports images format){" "}
            </span>
          ) : imageProgress > 0 && imageProgress < 100 ? (
            <span className=" text-slate-500">{`image uploading ${imageProgress}% done`}</span>
          ) : imageProgress === 100 ? (
            <span className=" text-green-500"> Image upload successfully</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="fullname"
          placeholder="Username"
          defaultValue={currentuser.fullname}
          className="bg-slate-200 rounded-lg pl-4 py-2"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="Email"
          id="email"
          defaultValue={currentuser.email}
          className="bg-slate-200 rounded-lg pl-4 py-2"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          className="bg-slate-200 rounded-lg pl-4 py-2"
          onChange={handlechange}
        />
        <button className="bg-slate-700 rounded-full p-2 uppercase font-medium text-white hover:opacity-95 disabled:opacity-80">
          {loading ? "loading" : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-2">
        <span
          className="text-red-600 cursor-pointer"
          onClick={handledeleteaccount}
        >
          Delete account
        </span>
        <span onClick={handlesignout} className="text-red-600 cursor-pointer">
          {" "}
          Signout
        </span>
      </div>
    </div>
  );
};

export default ProfilePage;
