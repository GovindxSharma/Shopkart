import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyOrders, clearErrors } from "../../redux/reducers/order/myOrder";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import TableCell from "@mui/material/TableCell";
import Metadata from "../layout/Metadata";
import { DataGrid } from '@mui/x-data-grid';
import './MyOrders.css'





const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
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
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(fetchMyOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <Metadata title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;

// const MyOrders = () => {
//   const dispatch = useDispatch();
//   const { loading, error, orders } = useSelector((state) => state.myOrders);
//   const { user } = useSelector((state) => state.user);

//   console.log("orderCheck-----------------------------------", orders);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(fetchMyOrders());
//   }, [dispatch, error]);

//   return (
//     <Fragment>
//       <Metadata title={`${user.name} - Orders`} />

//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="myOrdersPage">
//           <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Order ID</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Items Qty</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orders.map((item) => (
//                   <TableRow key={item._id}>
//                     <TableCell>{item._id}</TableCell>
//                     <TableCell>
//                       <span
//                         style={{
//                           color:
//                             item.orderStatus === "Delivered" ? "green" : "red",
//                         }}
//                       >
//                         {item.orderStatus}
//                       </span>
//                     </TableCell>
//                     <TableCell>{item.orderItems.length}</TableCell>
//                     <TableCell>{item.totalPrice}</TableCell>
//                     <TableCell>
//                       <Link to={`/order/${item._id}`}>
//                         <LaunchIcon />
//                       </Link>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       )}
//     </Fragment>
//   );
// };

// export default MyOrders;
