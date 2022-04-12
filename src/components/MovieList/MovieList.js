import React from 'react';
import { Alert } from 'antd';

import MovieItem from '../MovieItem/MovieItem';
import MyError from '../ErrorComponent/MyError';
import MySpin from '../Spin/Spin';
import { MovieConsumer } from '../../services/movie-service-context/movie-service-context';
import './MovieList.css';

export default class MovieList extends React.Component {
  elems() {
    const { movieData, loading, homePage, getMovieRating, movieRatingData } = this.props;

    if (movieData.length === 0 && !homePage) {
      return (
        <div className="err main__err">
          <Alert
            message="Informational Notes"
            description="Cannot find your request, please try one more time"
            type="info"
            showIcon
          />
        </div>
      );
    }

    return movieData.map((val) => {
      const { id } = val;
      const { ...props } = val;
      return (
        <MovieConsumer key={id}>
          {({ postMovieRate }) => {
            return (
              <MovieItem
                {...props}
                postMovieRate={postMovieRate}
                loading={loading}
                getMovieRating={getMovieRating}
                movieRatingData={movieRatingData}
              />
            );
          }}
        </MovieConsumer>
      );
    });
  }

  render() {
    const { error, loading } = this.props;

    const hasData = !(error || loading);

    const classNaming = 'big-spin main__big-spin';

    const errMessage = error ? <MyError /> : null;
    const load = loading ? <MySpin className={classNaming} /> : null;
    const content = hasData ? this.elems() : null;

    return (
      <ul className="movie-list main__movie-list">
        {errMessage}
        {load}
        {content}
      </ul>
    );
  }
}
