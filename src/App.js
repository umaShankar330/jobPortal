import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Jobs from './components/jobs'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import JobItemDetails from './components/JobItemDetails'
import Home from './components/Home'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={NotFound} />

    <Redirect to="/not-found" />
  </Switch>
)

export default App
