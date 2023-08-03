import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  //   const findJobs = () => {
  //     const {history} = props
  //     history.replace('/jobs')
  //   }

  <>
    <Header />
    <div className="home-container">
      <div className="card-cont">
        <h1 className="title">Find The Job That Fits Your Life</h1>
        <p className="desc">
          Millions of people are searching for jobs. salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
