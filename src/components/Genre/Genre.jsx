import React from 'react';

import './Genre.scss';

export default class Genre extends React.Component {
  state = {
    genres: [],
  };

  componentDidMount() {
    this.setNameOfGenre();
  }

  setNameOfGenre = () => {
    const { genre_ids, genres } = this.props;

    const newArr = [];

    genre_ids.forEach((genre) =>
      genres.forEach((item) => {
        if (item.id === genre) {
          return newArr.push(item);
        }
      })
    );

    return this.setState({
      genres: newArr,
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
