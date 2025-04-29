import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import '../../src/fonts.css';
import '../../src/styles.css';

const NavbarProfile=  () => {
  const [activeLink, setActiveLink] = useState('home');
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };


  const handleLogout = () => {
    navigate('/');
  };

  return (

      <Navbar fixed="top" expand="lg" className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
            <Container fluid className="px-4 d-flex align-items-center justify-content-between">
              {/* Logo always on the left */}
              <Navbar.Brand href="/">
                <img src={logo} alt="Logo" height="40" />
              </Navbar.Brand>
      
              {/* Mobile Login button - visible only on small screens */}
              <div className="d-flex align-items-center ms-auto flex-nowrap">
                {/* Mobile Login button */}
                <button 
                  className="logout-btn d-lg-none me-2"
                  onClick={() => handleLogout}
                >
                  Logout
                </button>
      
                {/* Toggler always last */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </div>
               <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                          <Nav.Link 
                            href="profile" 
                            className={activeLink === 'profile' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('profile')}
                          >
                            Profile
                          </Nav.Link>
                          <Nav.Link 
                            href="/add-local" 
                            className={activeLink === 'add-local' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('add-local')}
                          >
                            Add a Local
                          </Nav.Link>
                          <Nav.Link 
                            href="/add-affiliate" 
                            className={activeLink === 'add-affiliate' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('add-affiliate')}
                          >
                            Add an Affiliate
                          </Nav.Link>
                          <Nav.Link 
                            href="/search" 
                            className={activeLink === 'search' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('search')}
                          >
                            Search
                          </Nav.Link>
                          <Nav.Link 
                            href="/statistics" 
                            className={activeLink === 'statistics' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('statistics')}
                          >
                            Statistics
                          </Nav.Link>
                          <Nav.Link 
                            href="/start-project" 
                            className={activeLink === 'start-project' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('start-project')}
                          >
                            Start a Project
                          </Nav.Link>
                          <Nav.Link 
                            href="/settings" 
                            className={activeLink === 'settings' ? 'active navbar-link' : 'navbar-link'}
                            onClick={() => onUpdateActiveLink('settings')}
                          >
                            Settings
                          </Nav.Link>
              
                          {/* Desktop Login button - visible only on large screens */}
                          <button 
                            className="logout-btn d-none d-lg-inline-block ms-3"
                            onClick={() => handleLogout()}
                          >
                            Logout
                          </button>
                        </Nav>
                      </Navbar.Collapse>
                    </Container>
                  </Navbar>

  );
};

export default NavbarProfile;

const styles = {
  navbar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    backgroundColor: '#0056b3',
    borderRadius: '4px',
  },
  logoutButton: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: 'auto',
  },
};
