import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../redux/reducers/user/forgotPassword";
import { toast } from "react-toastify";
import Metadata from "../layout/Metadata";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token)

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const resetData = {
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(resetData)

    dispatch(resetPassword({token, resetData}));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password Updated Successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Change Password" />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2 className="resetPasswordHeading">Update Profile</h2>

              <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                <div>
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="resetPasswordBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
