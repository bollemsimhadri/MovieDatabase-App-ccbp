import {Component} from 'react'

import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const API_KEY = 'd0d3d7e8bbd72f383d6d647b082456c3'
const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    movies: [],
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch(getPopularMoviesURL)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      if (data && data.results) {
        this.setState({
          movies: data.results,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#3B82F6" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {movies} = this.state
    // console.log(movies)
    return (
      <div className="home-container">
        <h1>Popular Movies</h1>
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="error-view">
      <p>Something went wrong. Please try again.</p>
      <button type="button" onClick={this.getPopularMovies}>
        Retry
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderView()}</>
  }
}

export default Home
