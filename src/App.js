import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Navbar from './components/Navbar'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import SearchedMovies from './components/SearchedMovies'

import './App.css'

// write your code here
class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/movies/:id" component={MovieDetails} />
          <Route exact path="/search/:query" component={SearchedMovies} />
        </Switch>
      </>
    )
  }
}

export default App
