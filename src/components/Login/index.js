import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', isLogin: true, errMsg: ''}

  changeName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  validateUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const fetchDetails = await fetch(apiUrl, options)
    const jwtToken = await fetchDetails.json()
    console.log(fetchDetails)
    if (fetchDetails.ok) {
      this.setState({isLogin: true})

      Cookies.set('jwt_token', jwtToken.jwt_token, {
        expires: 30,
        path: '/',
      })
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isLogin: false, errMsg: jwtToken.error_msg})
    }
  }

  render() {
    const {username, password, isLogin, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="login-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form className="form-cont" onSubmit={this.validateUser}>
            <label htmlFor="name" className="label">
              USERNAME
            </label>
            <input
              id="name"
              type="text"
              className="user-name"
              placeholder="Username:rahul"
              value={username}
              onChange={this.changeName}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="user-name"
              placeholder="Password:rahul@2021"
              value={password}
              onChange={this.changePassword}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {isLogin ? null : <p className="error-login">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
