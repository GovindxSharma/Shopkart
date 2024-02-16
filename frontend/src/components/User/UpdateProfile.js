import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  updateProfile,
  reset,
} from "../../redux/reducers/user/profileReducer";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/reducers/user/userReducer";
import Metadata from "../layout/Metadata";
import Loader from "../layout/Loader/Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);


  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
   
    dispatch(updateProfile(myForm));
    console.log('MYFORM',myForm)
  };


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("Profile Updated");
      dispatch(loadUser());
      navigate("/account");
      dispatch(reset());
    }
  }, [error, dispatch, isUpdated, navigate, user]);

  console.log(name,email)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Update-Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="updateProfile"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
