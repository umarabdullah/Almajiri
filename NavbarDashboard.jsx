import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import '../../src/fonts.css';
import '../../src/styles.css';

function NavbarDashboard() {
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
            className="login-btn d-lg-none me-2"
            onClick={() => navigate('/login')}
          >
            Login
          </button>

          {/* Toggler always last */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>


        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              href="/" 
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="/projects" 
              className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('projects')}
            >
              Projects
            </Nav.Link>
            <Nav.Link 
              href="/contact-us" 
              className={activeLink === 'contact-us' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('contact-us')}
            >
              Contact Us
            </Nav.Link>

            {/* Desktop Login button - visible only on large screens */}
            <button 
              className="login-btn d-none d-lg-inline-block ms-3"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarDashboard;
