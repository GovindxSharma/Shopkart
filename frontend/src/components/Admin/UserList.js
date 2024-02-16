import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Metadata from "../layout/Metadata";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

import { fetchAllUsersAdmin,clearErrors,deleteUserReset,deleteUser } from "../../redux/reducers/admin/adminAllUser";
const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { error, users } = useSelector((state) => state.adminUsers);
  
    const {
      error: deleteError,
      isDeleted,
      message,
    } = useSelector((state) => state.profile);
  
    const deleteUserHandler = (id) => {
      dispatch(deleteUser(id));
      navigate("/admin/dashboard");
      toast.success('User Deleted Successfully');
    };
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
  
      if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success(message);
        dispatch(deleteUserReset());
      }
  
      dispatch(fetchAllUsersAdmin());
    }, [dispatch, error, deleteError, isDeleted, message]);
  
    const columns = [
      { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
      {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 0.5,
      },
      {
        field: "role",
        headerName: "Role",
        type: "number",
        minWidth: 150,
        flex: 0.3,
        cellClassName: (params) => {
          return params.value === "admin" ? "greenColor" : "redColor";
        },
      },
      {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <Fragment>
              <Link to={`/admin/user/${params.row.id}`}>
                <EditIcon />
              </Link>
              <Button onClick={() => deleteUserHandler(params.row.id)}>
                <DeleteIcon />
              </Button>
            </Fragment>
          );
        },
      },
    ];
  
    const rows = users
      ? users.map((item) => ({
          id: item._id,
          role: item.role,
          email: item.email,
          name: item.name,
        }))
      : [];
  
    return (
      <Fragment>
        <Metadata title={`ALL USERS - Admin`} />
  
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL USERS</h1>
  
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </div>
        </div>
      </Fragment>
    );
  };
  
  export default UsersList;