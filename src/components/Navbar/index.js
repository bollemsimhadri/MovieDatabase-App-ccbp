import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  state = {
    searchInput: '',
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = event => {
    event.preventDefault()
    const {searchInput} = this.state
    const {history} = this.props
    if (searchInput.trim() !== '') {
      history.push(`/search/${searchInput}`)
      this.setState({searchInput: ''})
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>movieDB</h1>
        </div>

        <form className="navbar-search" onSubmit={this.onSearch}>
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchInput}
            onChange={this.onChangeInput}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <ul className="navbar-links">
          <li>
            <Link to="/" className="link">
              Popular
            </Link>
          </li>
          <li>
            <Link to="/top-rated" className="link">
              Top Rated
            </Link>
          </li>
          <li>
            <Link to="/upcoming" className="link">
              Upcoming
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(NavBar)
