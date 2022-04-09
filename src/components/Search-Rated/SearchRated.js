import React from 'react';
import './SearchRated.css';

export default class SearchRated extends React.Component {
  onRatedBtn = () => {
    this.props.onRated();
    this.props.onRatedMovies();
  };

  onSearchBtn = () => {
    this.props.onSearch();
  };

  render() {
    return (
      <ul className="search-rated header__search-rated">
        <li className="search-rated__option option">
          <button className="option__option-btn option-btn" onClick={this.onSearchBtn}>
            Search
          </button>
        </li>
        <li className="search-rated__option option">
          <button className="option__option-btn option-btn" onClick={this.onRatedBtn}>
            Rated
          </button>
        </li>
      </ul>
    );
  }
}
