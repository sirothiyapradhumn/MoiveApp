import React, { Component } from 'react'
import API_KEY from '../secrets';
import axios from 'axios';

export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            movies : [],
            genre: [],
            currGenre: "All Genere",
        }
    }

    async componentDidMount(){
        let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        
        let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

        let genreArr = [];
        ans.data.results.map((movieObj)=> {
            if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
                genreArr.push(genreId[movieObj.genre_ids[0]]);
            }
        });
        genreArr.unshift("All Genere");
        console.log(genreArr);
        
        this.setState({
        movies:[...ans.data.results], //spread
        genre: [...genreArr]
        })
    }

    handelClick = (genreName) => {
        this.setState({
            currGenre: genreName,
        })
    }

  render() {
    let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    return (
        <div class="row">
            <div class="col favourites-list">
                <ul class="list-group" >
                {
                    this.state.genre.map((genreName) =>(
                        this.state.currGenre == genreName ?(
                            <li class="list-group-item active" aria-current="true" >{genreName}</li>
                        ) : (
                            <li class="list-group-item " aria-current="true" onClick={()=>{this.handelClick(genreName)}}>{genreName}</li>
                        )
                        
                    ))
                }
                </ul>
            </div>
            <div class="col-9 favourites-table">
                <div class ="row">
                    <input type ="text" className='col' placeholder='Search'></input>
                    <input type ="text" className='col' placeholder='5'></input>
                </div>
                <div class= "row">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Popularity</th>
                            <th scope="col">Rating</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map((movieObj) =>(
                                    <tr>
                                    <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'8rem'}}/>
                                    {movieObj.original_title}</th>
                                    
                                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td><button type="button" class="btn btn-outline-danger">Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
        
    )
  }
}
