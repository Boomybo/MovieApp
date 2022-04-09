import React from "react";
import SearchRated from "../Search-Rated/SearchRated";
import SearchInput from "../Search-input/Searchinput";
import MovieList from "../MovieList/MovieList";
import FirstPage from "../First-Page/FirstPage";
import { Pagination } from "antd";

import debounce from "lodash.debounce";
import { MovieProvider } from "../movie-service-context/movie-service-context";
import MovieDB from "../service/movie-service";

export default class App extends React.Component {

    api = new MovieDB()

    state = {
        receivedMovies: [],
        loading: false,
        error: false,
        total_pages: 0,
        pageNumber: 1,
        url: "",
        firstPage: true,
        session_id: localStorage.getItem("guest_id"),
        ratedPage: false,
        searchPage: true,
        ratedMovies: [],
        movieRating: []
    }

    componentDidMount() {   
        this.getGusetId()
        const debounced = debounce(this.getPages, 1000)
        return debounced()
    }

    componentDidUpdate(prevProps, prevState) {
        const {pageNumber, url, total_pages, searchPage} = this.state

        if(searchPage !== prevState.searchPage) {
            this.setState({
                loading: true
            })
            this.getRatedMovies()
        }

        if((url !== prevState.url) || (pageNumber !== prevState.pageNumber)) {
            this.setState({
                loading: true,
            })
            const debounced = debounce(this.getPages, 1000)
            return debounced()
        }
        if((((total_pages/20) < pageNumber) && total_pages !== 0)) {
            this.setState({
                pageNumber: 1
            })
        }
    }

    getPages = () => {
            const { pageNumber, url } = this.state
            this.api
            .getMovies(url, pageNumber)
            .then(val => {
                return val
            })
            .then(this.onMoviesLoaded)
            .catch(err => {
                if(err.status === 422) {
                    return this.setState({
                        firstPage: true,
                        pageNumber: 1
                    })
                }
                return this.onError(err)
            })
    }

    getRatedMovies = () => {
        this.api
        .getRatedMovies(localStorage.getItem("guest_id"))
        .then(val => {
            return val
        })
        .then(this.onRatedMoviesLoaded)
        .catch(this.onError)
    }

    getGusetId = () => {
        this.api
        .createGuestSession()
        .then(val => {
            if(localStorage.getItem("guest_id") === null) {
                localStorage.setItem("guest_id", val.guest_session_id)
            }
        })
        .catch(this.onError)
    } 

    getUrl = (value) => {
        this.setState({
            url: value
        })
    }

    getMovieRating = (id, rate) => {
        const newMovieRatingItem = {
            movieId: id,
            movieRaiting: rate
        }
        this.setState(({movieRating}) => {
            const newMovieRating = [...movieRating, newMovieRatingItem]
            localStorage.setItem("ratedMovies", JSON.stringify(newMovieRating))
            return {
                movieRating: newMovieRating
            }
        })
    }

    onMoviesLoaded = (val) => {
        this.setState({
            receivedMovies: val.results,
            total_pages: val.total_pages * 20,
            loading: false,
            error: false,
            firstPage: false
        })
    }

    onRatedMoviesLoaded = (val) => {
        this.setState({
            ratedMovies: val.results,
            rated_total_pages: val.total_pages * 20,
            loading: false,
            error: false,
        })
    }

    onError = (err) =>  {
        this.setState({
            error: true,
            loading: false, 
            firstPage: false
        });
    };

    onChange = (number) => {
        this.setState({
            pageNumber: number
        })
    }

    onRated = () => {
        this.setState({
            ratedPage: true,
            searchPage: false
        })
    }

    onSearch = () => {
        this.setState({
            searchPage: true,
            ratedPage: false
        })
    }

    render() {

        console.log(this.state.movieRating)

        const {receivedMovies, loading, error, total_pages, firstPage, searchPage, ratedMovies, rated_total_pages, movieRating} = this.state

        const movieData = searchPage ? receivedMovies : ratedMovies
        
        const totalPages = searchPage ? total_pages : rated_total_pages

        const searchInput = searchPage ? <SearchInput getUrl={this.getUrl}/> : null

        const startPage = firstPage ? <FirstPage loading={loading} error={error}/> : <MovieList data={movieData} loading={loading} error={error} firstPage={firstPage} getMovieRating={this.getMovieRating} movieRatingData={movieRating}/>

        const onRatedPage = ratedMovies.length === 0 ?  <FirstPage loading={loading} error={error}/> : <MovieList data={movieData} loading={loading} error={error} firstPage={firstPage} getMovieRating={this.getMovieRating} movieRatingData={movieRating}/>

        const mainContent = searchPage ? startPage : onRatedPage

        return ( 
        <MovieProvider value={this.api}>
            <section className="content">
                <header className="header">
                    <SearchRated onRated={this.onRated} onSearch={this.onSearch} onRatedMovies={this.getRatedMovies}/>
                    {searchInput}
                </header>
                <main className="main">
                    {mainContent}
                </main>
                <footer className="footer">
                <Pagination defaultCurrent={1} total={totalPages} defaultPageSize={20} onChange={this.onChange}/>
                </footer>
            </section>
        </MovieProvider>
        )
    }
}