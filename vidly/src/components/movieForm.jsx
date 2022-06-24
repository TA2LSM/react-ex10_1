import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi-browser';

import Form from './common/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

function withParams(Component) {
  return props => (
    <Component
      {...props}
      params={useParams()}
      // history={createBrowserHistory()}
      navigate={useNavigate()}
    />
  );
}
class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return navigate('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genreId,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    let { navigate } = this.props;

    saveMovie(this.state.data);
    navigate('/movies');
  };

  render() {
    return (
      <>
        <h3>Movie Form</h3>
        <form>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </>
    );
  }
}

export default withParams(MovieForm);
