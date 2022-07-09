import React, { Component } from 'react'
import { movies } from './getMovies'
export default class List extends Component {
  render() {
    let movie = movies.results;
    return (
      <>
        {
          movie.length == 0 ? (
            <div className="spinner-grow text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ):(
            <div>
              <h3 className="text-center">
                <strong>Trending</strong>
              </h3>
              <div className='movie-list'>
                {
                  movie.map((movieObj) =>(
                    <div className="card movie-card">
                      <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top banner-image" alt="..."  style={{height:"40vh", width:"20vw"}}/>
                      <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                      <div className='button-wrapper'>
                        <a href="#" class="btn btn-primary movie-button">Add to Favourites</a>
                      </div>
                    </div>
                  ))
                }
              </div>
              
            </div>

          )
        }
      </>
    );
  }
}
