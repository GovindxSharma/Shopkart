import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Metadata from "../layout/Metadata";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import {
  clearErrors,
  updateUser,
  updateUserReset,
  getUserDetails,
} from "../../redux/reducers/admin/adminAllUser";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, userDetails,isUpdated, } = useSelector(
    (state) => state.adminUsers
  );

  const {
    loading: updateLoading,
    error: updateError
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

 useEffect(() => {
   if (userDetails) {
     setName(userDetails.name);
     setEmail(userDetails.email);
     setRole(userDetails.role);
   }

   if (error) {
     toast.error(error);
     dispatch(clearErrors());
   }

   if (updateError) {
     toast.error(updateError);
     dispatch(clearErrors());
   }

   if (isUpdated ) {
     dispatch(updateUserReset());
     toast.success("User Updated Successfully");
     navigate("/admin/dashboard");
   }
 }, [dispatch, error, isUpdated, updateError, userDetails,  navigate]);


const updateUserSubmitHandler = (e) => {
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email", email);
  myForm.set("role", role);

  dispatch(updateUser({ id, myForm }));
};

  return (
    <Fragment>
      <Metadata title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
