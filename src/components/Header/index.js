import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bar-container">
      <ul className="nav-list-section">
        <li className="logo-list">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
          </Link>
        </li>
        <li className="items-cont">
          <Link to="/" className="text">
            <p className="text">Home</p>
          </Link>
          <Link to="/jobs" className="text">
            <p className="text">Jobs</p>
          </Link>
        </li>
        <li className="btn-list">
          <button type="button" className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
