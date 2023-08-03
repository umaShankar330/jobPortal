import './index.css'

const NotFound = () => (
  <div className="not-found-cont">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="title">Page Not FOund</h1>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
