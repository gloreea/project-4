import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faMagnifyingGlass, faSignOutAlt, faLightbulb } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../Navbar.css'

export default function Navbar({ currentUser, handleLogout }) {
	const loggedIn = (
		<>
			<nav className="navbar">
        <div className="navbar-links">
          <Link to="/home" className="navbar-link">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            <span>Feed</span>
          </Link>

          <Link to="/festivals" className="navbar-link">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            <span>Festivals</span>
          </Link>

          <Link to="/recommendations" className="navbar-link">
            <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
            <span>Recommendations</span>
          </Link>
        </div>
		<div>
		{/* <img src="./vibefest-1.png" alt="Logo" className="logo" /> */}
		</div>
        <div className="navbar-links-right">
          <Link to="/profile" className="navbar-link">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span>Profile</span>
          </Link>

          <Link to="/" onClick={handleLogout} className="navbar-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            <span>Log Out</span>
          </Link>
        </div>
      </nav>
    </>

	)

	const loggedOut = (
		<p></p>
	)

	return (
		<nav>
			{/* user always sees this section */}
			

			{currentUser ? loggedIn : loggedOut}
		</nav>
	)
}