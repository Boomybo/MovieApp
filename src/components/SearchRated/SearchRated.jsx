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
    const { searchPage } = this.props;

    let searchClass = 'option__option-btn option-btn',
      ratedClass = 'option__option-btn option-btn';

    if (searchPage) {
      searchClass += ' option-btn--active';
      ratedClass.replace('  option-btn--active');
    } else {
      searchClass.replace('  option-btn--active');
      ratedClass += '  option-btn--active';
    }

    return (
      <ul className="search-rated header__search-rated">
        <li className="search-rated__option option">
          <button className={searchClass} onClick={this.onSearchBtn} id="search">
            Search
          </button>
        </li>
        <li className="search-rated__option option">
          <button className={ratedClass} onClick={this.onRatedBtn} id="rated">
            Rated
          </button>
        </li>
      </ul>
    );
  }
}
