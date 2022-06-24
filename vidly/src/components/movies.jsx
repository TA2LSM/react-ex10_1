import React, { Component } from 'react'; //imrc
import { Link } from 'react-router-dom';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

//components
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';

// reusable
import { paginate } from '../utils/paginate';

//cc
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    // selectedGenre: [],
    defaultPageSizes: [1, 2, 3, 4, 5, 10],
    currentPage: 1,
    pageSize: 0,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres', _id: 'specialID_9074386754' }, ...getGenres()];
    const selectedGenre = genres[0];

    const availablePageSizes = [...this.state.defaultPageSizes];
    const pageSize = availablePageSizes[2];

    this.setState({ movies: getMovies(), genres, selectedGenre, pageSize });
  }

  // arrow function syntax'i kullanıldı. (this ifadesini constructor içinde bind etmeye gerek olmasın diye)
  handleDelete = movie => {
    // //console.log(movie); // silinen movie'yi consola bas
    // const updatedMovies = this.state.movies.filter((m) => m._id !== movie._id);
    // this.setState({ movies: updatedMovies }); // this ile erişildiği için direkt "movies" property'si güncellenebilir.

    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    // modern JavaScript'te değiştirilen değer ile yerine koyulacak değerlerin isimleri aynı ise kod
    // yukarıdaki gibi yazılabilir.
  };

  handleLike = movie => {
    //console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = pageNumber => {
    //console.log(pageNumber);
    this.setState({ currentPage: pageNumber });
  };

  handlePageSizeChange = pageSize => {
    //console.log(pageSize);
    this.setState({ pageSize, currentPage: 1 });
  };

  handlePrevious = pageNumber => {
    // console.log(pageNumber);
    if (pageNumber > 1) this.setState({ currentPage: pageNumber - 1 });
  };
  handleNext = (pageNumber, totalPages) => {
    // console.log(pageNumber);
    if (pageNumber < totalPages) this.setState({ currentPage: pageNumber + 1 });
  };

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { movies: allMovies, currentPage, pageSize, selectedGenre, sortColumn, searchQuery } = this.state;
    let filteredMovies = allMovies;

    if (searchQuery)
      filteredMovies = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre.name !== 'All Genres')
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    //movies objesine ait lenght metodunun dönüşü count olarak alınıyor
    if (count === 0) return <p>There no movies in the database!</p>;

    const { genres: allGenres, defaultPageSizes, currentPage, pageSize, selectedGenre, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPageData();

    let tableHeight;
    if (totalCount < pageSize) tableHeight = totalCount * 50 + 40;
    else tableHeight = pageSize * 50 + 40;
    tableHeight = tableHeight.toString() + 'px';

    return (
      <div>
        <div className='row dflex'>
          <div className='col-2 mb-2 dflex align-items-center'>
            <div
              className='row-2'
              style={{ textAlign: 'center' }}
            >
              <span>
                <b>
                  <i>SELECT GENRE</i>
                </b>
              </span>
            </div>
            <div className='row-2'>
              <ListGroup
                items={allGenres}
                selectedItem={selectedGenre}
                // aşağıdaki değerler modül içinde default geçildi. Burada başka bir değer verilirse
                // default değerlerin üstüne yazılır.
                // textProperty="name"
                // valueProperty="_id"
                onItemSelect={this.handleGenreSelect}
              />
            </div>
          </div>

          <div className='col'>
            <div className='row mb-2'>
              <div className='col'>
                <SearchBox
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
                />
              </div>
            </div>

            <div className='row dflex align-items-center'>
              <div className='col-2'>
                <Link
                  to='/movies/new'
                  className='btn btn-outline-primary'
                >
                  Add New Movie
                </Link>
              </div>

              <div
                className='col'
                style={{ textAlign: 'end' }}
              >
                <span>
                  Showing <b>{totalCount}</b> movies in the database
                </span>
              </div>
            </div>
            <div
              className='row d-flex flex-column'
              style={{ height: tableHeight }}
            >
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </div>
            <hr
              className='border-2 border-bottom border-danger'
              // style={{ border: "2px red dashed" }}
              // bg-danger
            />

            <div
              className='row g-2'
              // style={{ border: '1px solid red' }}
            >
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                defaultPageSizes={defaultPageSizes}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                onSelectPrevious={this.handlePrevious}
                onSelectNext={this.handleNext}
                onPageSizeSelection={this.handlePageSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
