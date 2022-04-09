import React from 'react';
import { Pagination } from 'antd';
import debounce from 'lodash.debounce';

import SearchRated from '../Search-Rated/SearchRated';
import SearchInput from '../Search-input/Searchinput';
import MovieList from '../MovieList/MovieList';
import HomePage from '../HomePage/HomePage';
import './App.css';
import { MovieProvider } from '../movie-service-context/movie-service-context';
import MovieDB from '../service/movie-service';

export default class App extends React.Component {
  api = new MovieDB();

  state = {
    receivedMovies: [],
    loading: false,
    error: false,
    total_pages: 0,
    pageNumber: 1,
    url: '',
    homePage: true,
    session_id: localStorage.getItem('guest_id'),
    ratedPage: false,
    searchPage: true,
    receivedRatedMovies: [],
    movieRating: [],
  };

  componentDidMount() {
    this.setGuestId();
    const debounced = debounce(this.getPages, 1000);
    return debounced();
  }

  componentDidUpdate(prevProps, prevState) {
    const { pageNumber, url, total_pages, searchPage } = this.state;

    if (searchPage !== prevState.searchPage) {
      this.setState({
        loading: true,
      });
      this.getRatedMovies();
    }

    if (url !== prevState.url || pageNumber !== prevState.pageNumber) {
      this.setState({
        loading: true,
      });
      const debounced = debounce(this.getPages, 1000);
      return debounced();
    }
    if (total_pages / 20 < pageNumber && total_pages !== 0) {
      this.setState({
        pageNumber: 1,
      });
    }
  }

  getPages = () => {
    const { pageNumber, url } = this.state;
    this.api
      .getMovies(url, pageNumber)
      .then((result) => result)
      .then(this.onMoviesLoaded)
      .catch((err) => {
        if (err.status === 422) {
          return this.setState({
            homePage: true,
            pageNumber: 1,
            loading: false,
            total_pages: 0,
          });
        }
        return this.onError;
      });
  };

  getRatedMovies = () => {
    this.api
      .getRatedMovies(localStorage.getItem('guest_id'))
      .then((result) => result)
      .then(this.onRatedMoviesLoaded)
      .catch(this.onError);
  };

  setGuestId = () => {
    this.api
      .createGuestSession()
      .then((result) => {
        if (localStorage.getItem('guest_id') === null) {
          localStorage.setItem('guest_id', result.guest_session_id);
        }
      })
      .catch(this.onError);
  };

  getUrl = (movieName) => {
    this.setState({
      url: movieName,
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

  onMoviesLoaded = (val) => {
    this.setState({
      receivedMovies: val.results,
      total_pages: val.total_pages * 20,
      loading: false,
      error: false,
      homePage: false,
    });
  };

  onRatedMoviesLoaded = (val) => {
    this.setState({
      receivedRatedMovies: val.results,
      rated_total_pages: val.total_pages * 20,
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
      total_pages,
      homePage,
      searchPage,
      receivedRatedMovies,
      rated_total_pages,
      movieRating,
    } = this.state;

    const movieData = searchPage ? receivedMovies : receivedRatedMovies;

    const totalPages = searchPage ? total_pages : rated_total_pages;

    const searchInput = searchPage ? <SearchInput getUrl={this.getUrl} /> : null;

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

    const onRatedPage = receivedRatedMovies.length === 0 ? <HomePage loading={loading} error={error} /> : movieList;

    const currentContent = searchPage ? displayedPage : onRatedPage;

    return (
      <MovieProvider value={this.api}>
        <section className="content container__content">
          <header className="header content__header">
            <SearchRated onRated={this.onRated} onSearch={this.onSearch} onRatedMovies={this.getRatedMovies} />
            {searchInput}
          </header>
          <main className="main content__main">{currentContent}</main>
          <footer className="footer content__footer">
            <Pagination defaultCurrent={1} total={totalPages} defaultPageSize={20} onChange={this.onChange} />
          </footer>
        </section>
      </MovieProvider>
    );
  }
}
