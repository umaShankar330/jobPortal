import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill, BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    activeTypeList: [],
    activeSalaryId: '',
    searchInput: '',
    jobsList: [],
    profileInfo: {},
    isLoading: true,
    isFail: false,
  }

  componentDidMount() {
    this.getJobsListItems()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchProfile = await fetch('https://apis.ccbp.in/profile', options)
    const jsonData = await fetchProfile.json()
    // console.log(jsonData)
    const reqData = jsonData.profile_details
    // console.log(reqData)
    const profileDetails = {
      name: reqData.name,
      profileImageUrl: reqData.profile_image_url,
      shortBio: reqData.short_bio,
    }
    this.setState({profileInfo: profileDetails})
  }

  renderProfileCard = () => {
    const {profileInfo} = this.state
    // this.setState({isLoading: true})
    console.log(profileInfo)
    const {name, profileImageUrl, shortBio} = profileInfo

    return (
      <li className="candidate-card">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="name-text">{name}</h1>
        <p className="info-text">{shortBio}</p>
      </li>
    )
  }

  // employee type cont
  employeeType = type => {
    const {activeTypeList} = this.state
    const {employmentTypeId, label} = type
    // console.log(activeTypeList)
    const toggleId = () => {
      const isPresent = activeTypeList.includes(employmentTypeId)
      let newList = []
      if (isPresent) {
        newList = activeTypeList.filter(eachId => eachId !== employmentTypeId)
      } else {
        newList = [...activeTypeList, employmentTypeId]
      }
      this.setState({activeTypeList: newList}, this.getJobsListItems)
    }
    return (
      <li className="item-cont" key={employmentTypeId}>
        <input
          id={employmentTypeId}
          className="check-box"
          onClick={toggleId}
          type="checkbox"
        />
        <label htmlFor={employmentTypeId} className="label-element">
          {label}
        </label>
      </li>
    )
  }

  renderEmployeeType = () => (
    <li className="employee-list-container">
      <h1 className="title-employee">Type of Employment</h1>
      <ul className="list-of-types">
        {employmentTypesList.map(eachType => this.employeeType(eachType))}
      </ul>
    </li>
  )
  /// salary range cont

  salaryRange = eachRange => {
    const {salaryRangeId, label} = eachRange
    // const {activeSalaryId} = this.state
    const selectRange = () => {
      this.setState({activeSalaryId: salaryRangeId}, this.getJobsListItems)
    }
    // console.log(activeSalaryId)
    return (
      <li key={salaryRangeId} className="salary-range-list">
        <input
          id={salaryRangeId}
          type="radio"
          name="salaryRange"
          value={salaryRangeId}
          onClick={selectRange}
        />
        <label className="label-element" htmlFor={salaryRangeId}>
          {label}
        </label>
      </li>
    )
  }

  renderSalaryRange = () => (
    <div className="salary-range-cont">
      <h1 className="salary-title">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(eachRange => this.salaryRange(eachRange))}
      </ul>
    </div>
  )
  // search input area start

  searchContent = () => {
    this.getJobsListItems()
  }

  saveEnteredInput = event => {
    const {searchInput} = this.state
    this.setState({searchInput: event.target.value})
    console.log(searchInput)
  }
  // search input area end

  getJobsListItems = async () => {
    this.setState({isLoading: true})
    const {activeTypeList, activeSalaryId, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken, 'token')
    const empType = activeTypeList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const fetchData = await fetch(apiUrl, options)
    console.log(fetchData, 'data-')
    if (fetchData.ok) {
      const data = await fetchData.json()
      //   console.log(empType)
      //   console.log(data.jobs[0])
      const reqList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: reqList, isFail: false, isLoading: false})
    } else {
      this.setState({isFail: true, isLoading: false})
    }
  }

  renderJobItem = eachJob => {
    const {
      companyLogoUrl,
      id,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = eachJob
    console.log(id)
    return (
      <Link className="list-style-remove" to={`/jobs/${id}`}>
        <li key={id} className="job-item-cont">
          <div className="top-cont">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="top-title">
              <h1 className="job-title">{title}</h1>
              <p className="job-rating">
                <AiFillStar className="star-icon" />
                {rating}
              </p>
            </div>
          </div>
          <div className="middle-cont">
            <div className="left-content">
              <p>
                <MdLocationOn className="location-icon" />
                {location}
              </p>
              <p>
                <BsFillBagFill className="emp-type-icon" />
                {employmentType}
              </p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr className="brake-line" />
          <div className="bottom-cont">
            <h1 className="desc-title">Description</h1>
            <p>{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }

  resetSearch = () => {
    this.setState(
      {
        activeTypeList: [],
        activeSalaryId: '',
        searchInput: '',
        jobsList: [],
        profileInfo: {},
      },
      this.getJobsListItems,
      this.getProfileDetails,
    )
  }

  renderSearchedResult = () => {
    const {jobsList, isLoading, isFail} = this.state
    console.log(jobsList === '')

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color=" #4f46e5" height="50" width="50" />
        </div>
      )
    }
    if (isFail) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-img"
          />
          <h1 className="failure-title">Oops! Something Went Wrong</h1>
          <p className="failure-desc">
            We cannot seem to find the page you are looking for
          </p>
          <button
            className="retry-btn"
            onClick={this.resetSearch}
            type="button"
          >
            Retry
          </button>
        </div>
      )
    }
    if (jobsList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="no jobs"
            className="failure-img"
          />
          <h1 className="failure-title">No Jobs Found</h1>
          <p className="failure-desc">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return jobsList.map(eachJob => this.renderJobItem(eachJob))
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <ul className="filter-list-container">
            {this.renderProfileCard()}
            <hr className="brake-line" />
            {this.renderEmployeeType()}
            <hr className="brake-line" />
            {this.renderSalaryRange()}
          </ul>
          <div className="search-and-jobCard-container">
            <div className="search-cont">
              <input
                type="search"
                onKeyPress={this.validateEnterInput}
                onChange={this.saveEnteredInput}
                className="search-input-box"
                value={searchInput}
                placeholder="Search"
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.searchContent}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="job-items-section">{this.renderSearchedResult()}</ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
