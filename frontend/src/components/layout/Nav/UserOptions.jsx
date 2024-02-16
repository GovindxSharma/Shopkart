import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../../redux/reducers/user/userReducer';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';

const UserOptions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const {cartItems}=useSelector((state)=>state.cart)

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    {icon:<ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>,
    name:`Cart(${cartItems.length})`,func:cart},
    { icon: <ExitToAppIcon />, name: 'Logout', func: logOutUser },
  ];

  if (user && user.role === 'admin') {
    options.unshift({ icon: <DashboardIcon />, name: 'Dashboard', func: dashboard });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }

  function orders() {
    navigate('/orders');
  }

  function account() {
    navigate('/account');
  }
  function cart() {
    navigate('/cart');
  }

  function logOutUser() {
    dispatch(logout());
    toast.success('LogOut SuccessFully');
    navigate('/');
  }

  return (
    <>
      { (
        <>
          {/* <h1>{user.name}</h1> */}
          <Backdrop open={open} style={{ zIndex: 10 }} />
          <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            direction='down'
            style={{ position: 'absolute', top: '55px', right: '0' }} // Adjust position as needed
            icon={
              <img
                className='speedDialIcon'
                src={user.avatar.url}
                alt='Profile'
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%', // Circular shape
                  objectFit: 'cover', // Cover the circular shape
                }}
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                style={{ width: '56px', height: '56px', borderRadius: '100%' }}
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth<=600?true:false}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </>
  );
};

export default UserOptions;
