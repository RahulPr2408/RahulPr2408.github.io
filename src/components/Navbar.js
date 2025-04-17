// src/components/Navbar.js
import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/second-plate-logo-title.png';

const navItems = [
  { text: 'Home', href: '#home' },
  { text: 'Our Story', href: '#about' },
  { text: 'Our Team', href: '#team' },
  { text: 'Testimonial', href: '#testimonial' },
  { text: 'Contact Us', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 991);
  const [showNavbar, setShowNavbar] = useState(true);
  const [navHeight, setNavHeight] = useState(0);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const lastY = useRef(window.pageYOffset);
  const prevIsMobile = useRef(window.innerWidth <= 991);

  const css = `
    .custom-navbar {
      background: #2F4F4F;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      min-height: 120px;
      transition: transform 0.3s ease;
    }
    .navbar-hidden {
      transform: translateY(-100%);
    }

    .container-fluid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .navbar-brand {
      flex: 0 0 auto;
    }
    .navbar-logo {
      max-height: 100px;
      object-fit: contain;
      padding: 4px;
    }

    /* —— Desktop Nav —— */
    .navbar-center {
      flex: 1;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    .navbar-nav {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-item {
      margin: 0;
    }
    .nav-link {
      display: inline-block;
      color: #FFE4C4 !important;
      padding: 0 20px;
      font-size: 1rem;
      white-space: nowrap;
      border-radius: 12px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .nav-link:hover {
      background-color: #FF6347 !important;
      color: #2F4F4F !important;
    }

    .btn-outline-light {
      padding: 12px 30px;
      border-radius: 120px !important;
      background: #FF6347;
      color: #FFF;
      border: 1px solid #FFE4C4;
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    .btn-outline-light:hover {
      background: #FFE4C4;
      color: #2F4F4F;
      border-color: #FF6347;
    }
    .btn-outline-light:focus {
      outline: none;
      box-shadow: none;
    }

    .navbar-toggler {
      display: none;
      background: none;
      border: none;
      font-size: 1.8rem;
      color: white;
      cursor: pointer;
      padding: 0 10px;
      margin-left: 1rem;
      border-radius: 50%;
    }
    .navbar-toggler:hover {
      background: rgba(255,255,255,0.1);
    }
    .navbar-toggler:focus {
      outline: none;
      box-shadow: none;
    }

    /* —— Mobile —— */
    @media (max-width: 991px) {
      .custom-navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
      }
      .navbar-toggler {
        display: inline-block;
      }

      /* Dropdown menu full width */
      .collapse {
        display: none;
        position: fixed;
        left: 0;
        right: 0;
        width: 100%;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background: #2F4F4F;
        padding: 10px 0;
        border-radius: 0 0 12px 12px;
      }
      .collapse.show {
        display: flex;
      }

      /* Center menu items + capsule highlight */
      .navbar-nav {
        flex-direction: column;
        align-items: center;
      }
      .nav-item {
        margin: 6px 0;
      }
      .nav-link {
        display: inline-block;
        padding: 8px 20px;
        border-radius: 999px;
      }

      .login-container {
        display: flex;
        align-items: center;
      }
    }

    /* —— Large screens return to static —— */
    @media (min-width: 992px) {
      .custom-navbar {
        position: static;
      }
      .navbar-center {
        justify-content: space-evenly;
      }
      .navbar-nav {
        flex-direction: row;
      }
      .nav-item {
        margin: 0;
      }
    }
  `;

  // Inject CSS and clean up on unmount
  useLayoutEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const h = navRef.current?.offsetHeight || 0;
    setNavHeight(h);
    document.body.style.paddingTop = isMobile ? `${h}px` : '0px';

    return () => {
      document.head.removeChild(styleEl);
      document.body.style.paddingTop = '0px';
    };
  }, []);

  // Update paddingTop based on menu open/close & navbar visibility
  useLayoutEffect(() => {
    const h = navRef.current?.offsetHeight || 0;
    setNavHeight(h);
    document.body.style.paddingTop = isMobile && showNavbar ? `${h}px` : '0px';
  }, [isOpen, showNavbar, isMobile]);

  // Listen for window resize, update isMobile & reset menu
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= 991;
      if (mobile !== prevIsMobile.current) {
        setIsOpen(false);
        setShowNavbar(true);
      }
      prevIsMobile.current = mobile;
      setIsMobile(mobile);

      const h = navRef.current?.offsetHeight || 0;
      document.body.style.paddingTop = mobile ? `${h}px` : '0px';
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // On mobile: hide nav when scrolling down, show when scrolling up
// On mobile: hide nav when scrolling down, show when scrolling up
// Also auto-close mobile menu when scrolling up
// On mobile: hide nav when scrolling down, show when scrolling up
// Also auto-close mobile menu when scrolling down
useEffect(() => {
  if (!isMobile) return;

  const onScroll = () => {
    const y = window.pageYOffset;
    if (Math.abs(y - lastY.current) < 10) return;

    const scrollingDown = y > lastY.current;

    // Hide navbar when scrolling down and scrolled past threshold
    setShowNavbar(!(scrollingDown && y > 100));

    // 🔽 Auto-close menu when scrolling down
    if (scrollingDown && isOpen) {
      setIsOpen(false);
    }

    lastY.current = y;
  };

  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, [isMobile, isOpen]);

  // Auto-close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = e => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('.navbar-toggler')
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`custom-navbar${!showNavbar ? ' navbar-hidden' : ''}`}
    >
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Second Plate Logo"
            className="navbar-logo"
          />
        </Link>

        {/* Desktop navigation */}
        {!isMobile && (
          <div className="navbar-center">
            <ul className="navbar-nav">
              {navItems.map(({ text, href }) => (
                <li className="nav-item" key={text}>
                  <a
                    href={href}
                    className="nav-link"
                    onClick={handleLinkClick}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Login + Mobile menu toggle */}
        <div className="login-container">
          <button className="btn-outline-light">Login</button>
          {isMobile && (
            <button
              className="navbar-toggler"
              onClick={() => setIsOpen(o => !o)}
            >
              {isOpen ? '✖' : '☰'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div
          ref={menuRef}
          className={`collapse${isOpen ? ' show' : ''}`}
          style={{
            position: 'fixed',
            top: navHeight,
            left: 0,
            right: 0,
            width: '100%',
            zIndex: 999
          }}
        >
          <ul className="navbar-nav">
            {navItems.map(({ text, href }) => (
              <li className="nav-item" key={text}>
                <a
                  href={href}
                  className="nav-link"
                  onClick={handleLinkClick}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;