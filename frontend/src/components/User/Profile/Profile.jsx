import React, { useEffect } from 'react';
import Metadata from '../../layout/Metadata';
import { useSelector } from 'react-redux';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../layout/Loader/Loader';

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === 'false') {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={`${user.name}-Profile`} />
          <div className="profileContainer">
            <div>
              <h1> My Profile</h1>
              {user && user.avatar && (
                <>
                  <img src={user.avatar.url} alt={user.name} />
                  <Link to="/me/update"> Edit Profile</Link>
                </>
              )}
            </div>
            {user && (
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(user.createdAt).substr(0, 10)}</p>
                </div>
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
