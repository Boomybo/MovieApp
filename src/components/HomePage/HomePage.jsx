import React from 'react';

import MySpin from '../Spin/Spin';
import MyError from '../ErrorComponent/MyError';

import icon from './Bongo-Cat-png-3.png';
import './HomePage.css';

export default class HomePage extends React.Component {
  render() {
    const { error, loading } = this.props;

    const hasData = !(error || loading);

    const classNaming = 'big-spin';

    const errMessage = error ? <MyError /> : null;
    const load = loading ? <MySpin className={classNaming} /> : null;
    const content = hasData ? <MyHomePage /> : null;

    return (
      <div className="home-page main__home-page">
        {errMessage}
        {load}
        {content}
      </div>
    );
  }
}

const MyHomePage = () => {
  return (
    <>
      <img src={icon} className="home-page__img"></img>
      <p className="home-page__text">Welcome to MovieApp!</p>
      <p className="home-page__text">Start using by entering the name of the movie</p>
    </>
  );
};
