import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobdetails: {}, similarJobList: [], isLoading: true}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    this.setState({isLoading: true})
    const {params} = match
    const {id} = params
    const {jobdetails, similarJobList} = this.state
    console.log('okk', jobdetails, similarJobList)
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const fetchData = await fetch(apiUrl, options)
    // console.log(fetchData)
    if (fetchData.ok) {
      const data = await fetchData.json()
      const jobInfo = data.job_details
      const lifeAt = jobInfo.life_at_company

      const jobDetails = {
        companyLogoUrl: jobInfo.company_logo_url,
        companyWebsiteUrl: jobInfo.company_website_url,
        employmentType: jobInfo.employment_type,
        id: jobInfo.id,
        jobDescription: jobInfo.job_description,
        skills: jobInfo.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: lifeAt.description,
          CompanyImageUrl: lifeAt.image_url,
        },
        location: jobInfo.location,
        packagePerAnnum: jobInfo.package_per_annum,
        rating: jobInfo.rating,
        title: jobInfo.title,
      }
      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(typeof [similarJobs])
      this.setState({
        jobdetails: jobDetails,
        similarJobList: similarJobs,
        isLoading: false,
      })
    }
  }

  //   skillsItem = eachSkill => {
  //     console.log(eachSkill)
  //   }

  renderJobDetails = () => {
    const {jobdetails} = this.state
    // console.log(jobdetails)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      jobDescription,
      employmentType,
      lifeAtCompany,
      skills,
      location,
      packagePerAnnum,
      rating,
    } = jobdetails

    // const {description, CompanyImageUrl} = lifeAtCompany
    // console.log(skills[0], 'vakey')
    console.log(skills, 'skills')
    console.log(lifeAtCompany, 'life-at')

    return (
      <div className="job-details-cont">
        <div className="top-cont">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="top-title">
            <h1 className="job-title">{title}</h1>
            <div className="rating-section">
              <p className="icon-img">
                <AiFillStar className="star-icon" />
              </p>
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-cont">
          <div className="left-content">
            <p className="location-item">
              <MdLocationOn className="location-icon" />
              {location}
            </p>
            <p className="emp-type-item">
              <BsFillBagFill className="emp-type-icon" />
              {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <r className="brake-line" />
        <div className="bottom-cont">
          <div className="visit-link-cont">
            <h1 className="desc-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              rel="company-website-link"
              className="visit-link"
            >
              Visit
            </a>
          </div>
          <p>{jobDescription}</p>
        </div>
        <div className="skills-cont">
          <h1 className="skills-title">Skills</h1>
          <ul className="skills-item-section">
            {skills !== undefined
              ? skills.map(eachSkill => {
                  const {imageUrl, name} = eachSkill
                  return (
                    <li className="eachSkill-list">
                      <img src={imageUrl} alt={name} className="skill-img" />
                      <p className="skill-name">{name}</p>
                    </li>
                  )
                })
              : null}
          </ul>
        </div>
        <div className="life-at-company-container">
          <h1 className="heading-life-at-company">Life at Company</h1>
          {lifeAtCompany !== undefined ? (
            <div className="company-desc-section">
              <p className="company-desc">{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.CompanyImageUrl}
                alt="life at company"
                className="company-img"
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  renderSimilarJob = eachJob => {
    const {
      companyLogoUrl,
      id,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = eachJob

    return (
      <li key={id} className="similar-job-item">
        <div className="logo-section">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo-similar"
          />
          <div className="top-title">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="star-icon" />
              {rating}
            </p>
          </div>
        </div>
        <div className="desc-cont">
          <h1 className="desc-title">Description</h1>
          <p className="similar-desc">{jobDescription}</p>
        </div>
        <div className="bottom-title">
          <p className="similar-job-location">
            <MdLocationOn className="location-icon" />
            {location}
          </p>
          <p className="job-type">
            <BsFillBagFill className="emp-type-icon" />
            {employmentType}
          </p>
        </div>
      </li>
    )
  }

  render() {
    const {similarJobList, isLoading} = this.state
    return (
      <>
        <Header />
        <div className="main-cont">
          {isLoading ? (
            <div className="loader-container" data-testid="loader">
              <Loader
                type="ThreeDots"
                color=" #4f46e5"
                height="50"
                width="50"
              />
            </div>
          ) : (
            <>
              {this.renderJobDetails()}
              <div className="similar-jobs-section">
                <h1 className="similar-job-title">Similar Jobs</h1>
                <ul className="similar-jobs-list">
                  {similarJobList.map(eachJob =>
                    this.renderSimilarJob(eachJob),
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </>
    )
  }
}

export default JobItemDetails
