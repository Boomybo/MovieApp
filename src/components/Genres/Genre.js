import React from 'react';
import './Genre.css';

export default class Genre extends React.Component {
  state = {
    genres: [],
    isMounted: false,
  };

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
    this.getGenres();
  }

  getGenres = () => {
    const { getGenres, id } = this.props;

    getGenres(id)
      .then((val) => val)
      .then(this.onGenreLoaded);
  };

  onGenreLoaded = (val) => {
    this.setState({
      genres: val.genres,
    });
  };

  genre() {
    const { genres } = this.state;

    return genres.map((val) => (
      <li className="genre genres__genre" key={val.id}>
        {val.name}
      </li>
    ));
  }

  render() {
    return <ul className="genres info__genres">{this.genre()}</ul>;
  }
}
