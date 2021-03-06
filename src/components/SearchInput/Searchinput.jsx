import React from 'react';

import './SearchInput.scss';

export default class SearchInput extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    const { changeQuery } = this.props;
    this.setState(
      {
        label: e.target.value,
      },
      () => {
        changeQuery(this.state.label);
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.onSub} className="input-form header__input-form">
        <input
          type="text"
          placeholder="Type to search..."
          className="movie-input input-form__movie-input"
          onChange={this.onLabelChange}
          onBlur={this.onBlur}
          value={this.props.query}
        ></input>
      </form>
    );
  }
}
