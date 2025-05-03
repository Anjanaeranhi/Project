import React, { Fragment, useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import LoginModal from '../Pages/loginModal';
import { useNavigate } from 'react-router';

const Homepage = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  const goToAdminLogin = () => navigate("/adminlogin");
  const goToSeller = () => navigate("/sellerlogin")

  return (
    <Fragment>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          background: 'linear-gradient(135deg, #1e1e2f, #2c2c3f)',
        }}
      >
        <div
          className="shadow-lg rounded p-5 text-center"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '400px',
            width: '100%',
          }}
        >
          {/* Logo */}
          <div className="mb-4">
            <div
              className="mx-auto d-flex justify-content-center align-items-center"
              style={{
                borderRadius: '50%',
                height: '60px',
                width: '60px',
                background: '#fff',
              }}
            >
              <FaPaintBrush
                style={{ height: '30px', width: '30px', color: '#6554af' }}
              />
            </div>
            <h2
              className="mt-3"
              style={{
                background: 'linear-gradient(to right, #6554af, #ff7eb3)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700',
              }}
            >
              Galeria
            </h2>
          </div>

          {/* Buttons */}
          <div className="d-flex flex-column gap-3 mt-4">
            <button
              className="btn btn-primary"
              onClick={handleShow}
              style={{
                padding: '12px',
                borderRadius: '30px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary"
              style={{
                padding: '12px',
                borderRadius: '30px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              onClick={goToSeller}
            >
              Seller Login
            </button>

            <button
              className="btn btn-primary"
              style={{
                padding: '12px',
                borderRadius: '30px',
                fontWeight: 'bold',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              onClick={goToAdminLogin}
            >
              Admin Login
            </button>
          </div>
        </div>
        <LoginModal show={show} handleClose={handleClose} />
      </div>
    </Fragment>
  );
};

export default Homepage;
