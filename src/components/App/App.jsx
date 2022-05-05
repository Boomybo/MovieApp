import React from 'react';
import { Pagination } from 'antd';
import debounce from 'lodash.debounce';
import 'antd/dist/antd.css';

import SearchRated from '../SearchRated/SearchRated';
import SearchInput from '../SearchInput/Searchinput';
import MovieList from '../MovieList/MovieList';
import { MovieProvider, GenresProvider } from '../../services/movie-service-context/movie-service-context';
import MovieService from '../../services/movie-service';
import Loader from '../Loader/Loader';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

import icon from './Bongo-Cat-png-3.png';
import './App.scss';

export default class App extends React.Component {
  movieService = new MovieService();

  someval = 5;

  state = {
    receivedMovies: [],
    loading: false,
    error: false,
    totalPages: 0,
    ratedTotalPages: null,
    pageNumber: 1,
    query: '',
    homePage: true,
    ratedPage: false,
    searchPage: true,
    receivedRatedMovies: [],
    movieRating: [],
    genres: null,
    globalLabel: '',
  };

  onGlobalLabel(someVal) {
    this.setState({
      globalLabel: someVal,
    });
  }

  componentDidMount() {
    this.setGuestId();
    this.setGenresArray();

    const debounced = debounce(this.getMovies, 100);
    return debounced();
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageNumber, query, totalPages, searchPage } = this.state;

    if (searchPage !== prevState.searchPage) {
      this.setState({
        loading: true,
      });
      this.getRatedMovies();
    }

    if (query !== prevState.query || pageNumber !== prevState.pageNumber) {
      this.setState({
        loading: true,
      });
      const debounced = debounce(this.getMovies, 1000);
      return debounced();
    }
    if (totalPages / 20 < pageNumber && totalPages !== 0) {
      this.setState({
        pageNumber: 1,
      });
    }
  }

  getMovies = () => {
    const { pageNumber, query } = this.state;
    this.movieService
      .requestForMovies(query, pageNumber)
      .then(this.onMoviesLoaded)
      .catch((err) => {
        if (err.status === 422) {
          return this.setState({
            homePage: true,
            pageNumber: 1,
            loading: false,
            totalPages: 0,
          });
        }
        return this.onError;
      });
  };

  getRatedMovies = () => {
    this.movieService
      .getRatedMovies(localStorage.getItem('guest_id'))
      .then((result) => result)
      .then(this.onRatedMoviesLoaded)
      .catch(this.onError);
  };

  setGuestId = () => {
    this.movieService
      .createGuestSession()
      .then((result) => {
        if (localStorage.getItem('guest_id') === null) {
          localStorage.setItem('guest_id', result.guest_session_id);
        }
      })
      .catch(this.onError);
  };

  setGenresArray = () => {
    this.movieService.getAllGenres().then((result) =>
      this.setState({
        genres: result.genres,
      })
    );
  };

  changeQuery = (movieName) => {
    this.setState({
      query: movieName,
    });
  };

  getMovieRating = (id, rate) => {
    const newMovieRatingItem = {
      movieId: id,
      movieRaiting: rate,
    };
    this.setState(({ movieRating }) => {
      const newMovieRating = [...movieRating, newMovieRatingItem];
      localStorage.setItem('ratedMovies', JSON.stringify(newMovieRating));
      return {
        movieRating: newMovieRating,
      };
    });
  };

  onMoviesLoaded = (movies) => {
    this.setState({
      receivedMovies: movies.results,
      totalPages: movies.total_pages * 20,
      loading: false,
      error: false,
      homePage: false,
    });
  };

  onRatedMoviesLoaded = (movies) => {
    this.setState({
      receivedRatedMovies: movies.results,
      ratedTotalPages: movies.total_pages * 20,
      loading: false,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
      homePage: false,
    });
  };

  onChange = (number) => {
    this.setState({
      pageNumber: number,
    });
  };

  onRated = () => {
    this.setState({
      ratedPage: true,
      searchPage: false,
    });
  };

  onSearch = () => {
    this.setState({
      searchPage: true,
      ratedPage: false,
    });
  };

  render() {
    const {
      receivedMovies,
      loading,
      error,
      totalPages,
      homePage,
      searchPage,
      receivedRatedMovies,
      ratedTotalPages,
      movieRating,
      query,
    } = this.state;

    const movieData = searchPage ? receivedMovies : receivedRatedMovies;

    const finalTotalPages = searchPage ? totalPages : ratedTotalPages;

    const searchInput = searchPage ? <SearchInput changeQuery={this.changeQuery} query={query} /> : null;

    const movieList = (
      <MovieList
        movieData={movieData}
        loading={loading}
        error={error}
        homePage={homePage}
        getMovieRating={this.getMovieRating}
        movieRatingData={movieRating}
      />
    );

    const displayedPage = homePage ? <HomePage loading={loading} error={error} /> : movieList;

    const ratingPage = receivedRatedMovies.length === 0 ? <HomePage loading={loading} error={error} /> : movieList;

    const currentContent = searchPage ? displayedPage : ratingPage;

    return (
      <MovieProvider value={this.movieService}>
        <section className="content container__content">
          <header className="header content__header">
            <SearchRated
              onRated={this.onRated}
              onSearch={this.onSearch}
              onRatedMovies={this.getRatedMovies}
              searchPage={searchPage}
            />
            {searchInput}
          </header>
          <GenresProvider value={this.state}>
            <main className="main content__main">{currentContent}</main>
          </GenresProvider>
          <footer className="footer content__footer">
            <Pagination defaultCurrent={1} total={finalTotalPages} defaultPageSize={20} onChange={this.onChange} />
          </footer>
        </section>
      </MovieProvider>
    );
  }
}

const HomePage = ({ loading, error }) => {
  const hasData = !(error || loading);

  const classNaming = 'big-spin';

  const errMessage = error ? <ErrorComponent /> : null;
  const load = loading ? <Loader className={classNaming} /> : null;

  const startingPage = (
    <>
      <img src={icon} className="home-page__img"></img>
      <p className="home-page__text">Welcome to MovieApp!</p>
      <p className="home-page__text">Start using by entering the name of the movie</p>
    </>
  );

  const content = hasData ? startingPage : null;

  return (
    <div className="home-page main__home-page">
      {errMessage}
      {load}
      {content}
    </div>
  );
};
