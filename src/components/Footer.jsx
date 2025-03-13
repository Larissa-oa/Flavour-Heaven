import React from 'react'
import githubLogo from '../assets/github.png'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <p>&copy; 2025 Recipe App. All rights reserved.</p>
      <div className="footer-links">
        <a href="#">Privacy Policy</a> | <a href="#">Contact Us</a>
        <a href="#"><img src={githubLogo} /></a>
      </div>
    </div>
  </footer>
  )
}

export default Footer
