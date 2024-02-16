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
import { deleteOrder,clearErrors,fetchAllOrdersAdmin, deleteOrderReset} from "../../redux/reducers/admin/adminAllOrders";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, orders } = useSelector((state) => state.adminOrders);
  const { error: deleteError, isDeleted,success } = useSelector((state) => state.adminOrders);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
    toast.success("Order Deleted Successfully");
    navigate("/admin/orders");
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
     
      dispatch(deleteOrderReset());
    }

    dispatch(fetchAllOrdersAdmin());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  useEffect(() => {
    if (success) {
      // Reload data after deletion
      dispatch(fetchAllOrdersAdmin());
    }
  }, [dispatch, success]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        if (params && params.value === "Delivered") {
          return "greenColor";
        } else {
          return "redColor";
        }
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
    status: item.orderStatus,
  })) || [];

  return (
    <Fragment>
      <Metadata title={`ALL ORDERS - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
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

export default OrderList;