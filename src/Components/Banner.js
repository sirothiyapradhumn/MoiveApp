import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios'
import API_KEY from '../secrets';
export default class Banner extends Component {
  constructor(){
    super();
    this.state = {
      movies_title :"",
      movies_poster:"",
      movies_overview:"",
    }
  }
  async componentDidMount(){
    //console.log("componentDidMount is called");
    //console.log(API_KEY);
    
    let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    //console.log(ans.data.results);
    let random = Math.floor(Math.random() * (20));
    //console.log(random);

    this.setState({
      movies_title:ans.data.results[random].original_title,
      movies_poster:ans.data.results[random].backdrop_path,
      movies_overview:ans.data.results[random].overview,
    })
  } 

  render() {
    //console.log(movies.results[0]);
    // let movie = movies.results[0];

    // let test = this.state.movies_title;
    // console.log(test);


    // this.state.movies.map((movieObj) =>{
    //   console.log(movieObj.original_title);
    // })

    return (
      <>
      {this.state.movies_title == "" ? (
        <div className="spinner-grow text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        ) : (
        <div className="card banner-card">
          <img src={`https://image.tmdb.org/t/p/original${this.state.movies_poster}`} className="card-img-top banner-image" alt="..."/>
          <h5 className="card-title banner-title">{this.state.movies_title}</h5>
          <p className="card-text banner-text">{this.state.movies_overview}</p>
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        </div>
        )}

      </>
    );
  }
}
