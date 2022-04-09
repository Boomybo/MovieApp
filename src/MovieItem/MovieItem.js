import React from "react";
import Genre from "../Genres/Genre";
import { format } from "date-fns";
import "antd/dist/antd.css"
import ImageLoader from "react-imageloader";
import MySpin from "../Spin/Spin";
import { MovieConsumer } from "../movie-service-context/movie-service-context";
import { Rate } from 'antd';

export default class MovieItem extends React.Component{

    cutText = (text) => {
        if(text.split("").length > 70) {
            return text.split("").slice(0, 70).join("") + "..."
        }
        return text
    }

    cutTitle = (text) => {
        if(text.length > 30) {
            return text.split("").slice(0, 30).join("") + "..."
        } 
        return text
    }

    getImg = (path) => {
        if(!path) {
            return "http://s1.iconbird.com/ico/2013/9/430/w256h2561378622483catsleep2.png"
            }
        return `https://image.tmdb.org/t/p/w185${path}`
    }

    preloader = () => {
        return <MySpin className="image-spin"/>
    }

    onChange = (rate) => {
        const {postMovieRate, id, getMovieRating} = this.props

        getMovieRating(id, rate)

        postMovieRate(id, localStorage.getItem("guest_id"), rate)
    }


    render() {
        
        const {title, vote_average, release_date, overview, poster_path, id, rating} = this.props

        let parsed = JSON.parse(localStorage.getItem("ratedMovies"))

        let movieRated = []
        if(parsed) {
            movieRated = parsed.filter(val => {
                if(val.movieId === id) {
                    return val
                }
                return null
            })
        }

        console.log(movieRated)

        //console.log(JSON.parse(localStorage.getItem("ratedMovies")))

        const finalRate = movieRated.length !== 0 ? movieRated[movieRated.length-1].movieRaiting : null

        const date = release_date ? format(new Date(release_date), "MMMM dd, yyyy") : null

        let classNaming = "rate "

        if(vote_average <= 3) {
            classNaming += "rate_terrible"
        } else if (vote_average > 3 && vote_average <= 5) {
            classNaming += "rate_bad"
        } else if (vote_average > 5 && vote_average<= 7) {
            classNaming += "rate_normal"
        } else {
            classNaming += "rate_wonderful"
        }

        return(
            <li className="movie-card">
                <div className="poster">
                <ImageLoader
                src={this.getImg(poster_path)}
                className="movie-poster"
                preloader={this.preloader}
                />
                </div>
                <section className="info">
                    <h3 className="movie-title">{this.cutTitle(title)}</h3>
                    <span className={classNaming}>{vote_average}</span>
                    <div className="date">{date}</div>
                    <MovieConsumer>
                    {
                        ({getGenres}) => {
                            return <Genre id={id} getGenres={getGenres}/>
                        }
                    }
                    </MovieConsumer>
                    <p className="description">{this.cutText(overview)}</p>
                    <Rate count={10} className="rating" onChange={this.onChange} value={finalRate}/>
                </section>
            </li>
        ) 
    }
}


