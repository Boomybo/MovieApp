
import React from "react";
import MovieItem from "../MovieItem/MovieItem";
import { Alert } from "antd";
import MyError from "../ErrorComponent/MyError";
import MySpin from "../Spin/Spin";
import { MovieConsumer } from "../movie-service-context/movie-service-context";

export default class MovieList extends React.Component{

    elems() {
        const {data, loading, firstPage, getMovieRating, movieRatingData} = this.props

        if ((data.length === 0) && !firstPage) {
            return <div className="err"><Alert
            message="Informational Notes"
            description="Cannot find your request, please try one more time"
            type="info"
            showIcon
          /></div>
            
        }

        return data.map(val => {
            const {id} = val;
            const { ...props } = val;
            return <MovieConsumer key={id}>
                {
                    ({postMovieRate}) => {
                        return <MovieItem {...props}
                        postMovieRate={postMovieRate}
                        loading={loading}
                        getMovieRating={getMovieRating}
                        movieRatingData={movieRatingData}
                        />
                    }
                }
            </MovieConsumer>
            
        })
    }

    

    render() {

        const {error, loading} = this.props

        const hasData = !(error || loading)

        const classNaming = "big-spin"

        const errMessage = error ? <MyError/> : null;
        const load = loading ? <MySpin className={classNaming}/> : null
        const content = hasData ? this.elems() : null

        return(
            <ul className="movie-list">
                {errMessage}
                {load}
                {content}
            </ul>
        )
    }
}
