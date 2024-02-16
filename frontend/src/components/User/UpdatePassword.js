import React, { useState ,useEffect} from 'react'
import Loader from '../layout/Loader/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { updatePassword ,clearError} from '../../redux/reducers/user/profileReducer'
import { toast } from "react-toastify";
import { reset } from '../../redux/reducers/user/profileReducer';
import Metadata from '../layout/Metadata';
import './UpdatePassword.css'
import { useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';



const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate()
   
 
    const { error, isUpdated, loading,message } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(updatePassword(myForm));
    };
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      }
  
        if (isUpdated) {
          navigate("/account");
          toast.success("Password Updated");
          dispatch(reset());
        }
      }, [dispatch, error, navigate,message, isUpdated]);
  
  return (
    <>
             {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default UpdatePassword