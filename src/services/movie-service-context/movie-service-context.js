import React from 'react';

const { Provider: MovieProvider, Consumer: MovieConsumer } = React.createContext();

const { Provider: GenresProvider, Consumer: GenresConsumer } = React.createContext();

export { MovieConsumer, MovieProvider, GenresConsumer, GenresProvider };
