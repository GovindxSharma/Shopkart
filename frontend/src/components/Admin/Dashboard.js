import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import {Chart as ChartJS} from 'chart.js/auto'
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminProducts } from "../../redux/reducers/admin/adminProducts.js";
import Metadata from "../layout/Metadata.jsx";
import { fetchAllOrdersAdmin } from "../../redux/reducers/admin/adminAllOrders.js";
import { fetchAllUsersAdmin } from "../../redux/reducers/admin/adminAllUser.js";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.adminProducts);

  const { orders } = useSelector((state) => state.adminOrders);

  const { users } = useSelector((state) => state.adminUsers);

console.log(ChartJS)

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrdersAdmin());
    dispatch(fetchAllUsersAdmin());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products ? products.length - outOfStock : 0],  // Check if products is defined
      },
    ],
  };
  

  return (
    <div className="dashboard">
      <Metadata title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1>Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
