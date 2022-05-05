import React from 'react';
import { format } from 'date-fns';
import ImageLoader from 'react-imageloader';
import { Rate } from 'antd';

import Genre from '../Genres/Genre';
import MySpin from '../Spin/Spin';
import { GenresConsumer } from '../../services/movie-service-context/movie-service-context';
import { cutText, cutTitle, getImg } from '../../utils/helpres';

import './MovieItem.css';

export default class MovieItem extends React.Component {
  preloader = () => {
    return <MySpin className="image-spin" />;
  };

  onChange = (rate) => {
    const { postMovieRate, id, getMovieRating } = this.props;

    getMovieRating(id, rate);

    postMovieRate(id, localStorage.getItem('guest_id'), rate);
  };

  render() {
    const { title, vote_average, release_date, overview, poster_path, id, genre_ids } = this.props;

    let parsed = JSON.parse(localStorage.getItem('ratedMovies'));

    let movieRated = [];
    if (parsed) {
      movieRated = parsed.filter((val) => {
        if (val.movieId === id) {
          return val;
        }
        return null;
      });
    }

    const finalRate = movieRated.length !== 0 ? movieRated[movieRated.length - 1].movieRaiting : null;

    const date = release_date ? format(new Date(release_date), 'MMMM dd, yyyy') : null;

    let classNaming = 'rate info__rate ';

    if (vote_average <= 3) {
      classNaming += 'rate_terrible';
    } else if (vote_average > 3 && vote_average <= 5) {
      classNaming += 'rate_bad';
    } else if (vote_average > 5 && vote_average <= 7) {
      classNaming += 'rate_normal';
    } else {
      classNaming += 'rate_wonderful';
    }

    return (
      <li className="movie-card movie-list__movie-card">
        <div className="poster movie-card__poster">
          <ImageLoader
            src={getImg(poster_path)}
            className="movie-poster poster__movie-poster"
            preloader={this.preloader}
          />
        </div>
        <section className="info movie-card__info">
          <h3 className="movie-title info__movie-title">{cutTitle(title)}</h3>
          <span className={classNaming}>{vote_average}</span>
          <div className="date info__date">{date}</div>
          <GenresConsumer>
            {({ genres }) => {
              return <Genre genre_ids={genre_ids} genres={genres} />;
            }}
          </GenresConsumer>
          <p className="description info__description">{cutText(overview)}</p>
          <Rate count={10} className="rating info__rating" onChange={this.onChange} value={finalRate} />
        </section>
      </li>
    );
  }
}
