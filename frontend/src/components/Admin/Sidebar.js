import React from "react";
import "./Sidebar.css";

import { Link } from "react-router-dom";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Groups3Icon from '@mui/icons-material/Groups3';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h3>ShopKart</h3>
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
          </Link>
        </TreeItem>
      </TreeView>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <Groups3Icon /> Users
        </p>
      </Link>
 
    </div>
  );
};

export default Sidebar;
