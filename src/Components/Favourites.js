import React, { Component } from 'react'
//import API_KEY from '../secrets';
//import axios from 'axios';

export default class Favourites extends Component {
    constructor(){
        super();
        this.state = {
            movies : [],
            genre: [],
            currGenre: "All Genere",
            currText: "",
            limit: 5,
            currPage: 1,
        }
    }

    async componentDidMount(){
        //let ans = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        
        let results = JSON.parse(localStorage.getItem("movies"));

        let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

        let genreArr = [];
        results.map((movieObj)=> {
            if(!genreArr.includes(genreId[movieObj.genre_ids[0]])){
                genreArr.push(genreId[movieObj.genre_ids[0]]);
            }
        });
        genreArr.unshift("All Genere");
        //console.log(genreArr);
        
        this.setState({
        movies:[...results], //spread
        genre: [...genreArr]
        })
    }

    handelClick = (genreName) => {
        this.setState({
            currGenre: genreName,
        })
    }

    handeltext = (e) =>{
        this.setState({
            currText: e.target.value,
        })
    }

    sortPopularityAsc = () =>{
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB)=> {
            return objA.popularity - objB.popularity;
        });

        this.setState({
            movies: [...allMovies],
        });
    }

    sortPopularityDesc = () =>{
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB)=> {
            return objB.popularity - objA.popularity;
        });

        this.setState({
            movies: [...allMovies],
        });
    }

    sortRatingAsc = () =>{
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB)=> {
            return objA.vote_average - objB.vote_average;
        });

        this.setState({
            movies: [...allMovies],
        });
    }

    sortRatingDesc = () =>{
        let allMovies = this.state.movies;
        allMovies.sort((objA, objB)=> {
            return objB.vote_average - objA.vote_average;
        });

        this.setState({
            movies: [...allMovies],
        });
    }

    handlePageNum = (page) =>{
        this.setState({
            currPage: page,
        })
    }

    handleDelete = (id) =>{
        let newMovies = this.state.movies.filter((movieObj) =>{
            return movieObj.id != id;
        })

        this.setState({
            movies:[...newMovies],
        })

        localStorage.setItem("movies" , JSON.stringify(newMovies));
    }

    handleLimit = (e) =>{
        if( e.target.value >=1){
            this.setState({
                limit: e.target.value,
            })
        }
        
        
    }

  render() {
    let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}

    let filteredMovies = this.state.movies;

    if(this.state.currText === ""){
        filteredMovies = this.state.movies;
    }
    else{
        filteredMovies = filteredMovies.filter((movieObj) =>{
            let movieName = movieObj.original_title.toLowerCase();
            return movieName.includes(this.state.currText); //[t,o,p, ,g,u,n, ,m,a,v,e,r,i,c,k]
        });
    }


    if(this.state.currGenre !== "All Genere"){
        filteredMovies = filteredMovies.filter((movieObj) => genreId[movieObj.genre_ids[0]] == this.state.currGenre);
    }

    let noOfPages = Math.ceil(filteredMovies.length/ this.state.limit);
    let pagesArr = [];
    for(let i = 1; i<=noOfPages; i++){
        pagesArr.push(i); // [1,2,3,4]
    }
    let si = (this.state.currPage -1) * this.state.limit;
    let ei = si + (this.state.limit-1);
    filteredMovies = filteredMovies.slice(si, ei+1);   //ei= 10 -> 9 so thatwhy we +1 to ei

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
                    <input type ="text" className='col' placeholder='Search' value={this.state.currText} onChange={this.handeltext}></input>
                    <input type ="number" className='col-2'  value={this.state.limit} onChange={this.handleLimit}></input>
                </div>
                <div class= "row">
                    <table class="table">
                        <thead class="table-dark">
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">
                                <i class="fa-solid fa-caret-up" onClick={this.sortPopularityAsc}/>
                                Popularity
                                <i class="fa-solid fa-caret-down" onClick={this.sortPopularityDesc}/>
                            </th>
                            <th scope="col">
                                <i class="fa-solid fa-caret-up" onClick={this.sortRatingAsc}/>
                                Rating
                                <i class="fa-solid fa-caret-down" onClick={this.sortRatingDesc}/>
                            </th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredMovies.map((movieObj) =>(
                                    <tr>
                                    <th scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{width:'8rem'}}/>
                                    {movieObj.original_title}</th>
                                    
                                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td><button type="button" class="btn btn-outline-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {
                        pagesArr.map((page) =>(
                            <li class="page-item">
                                <a class="page-link" onClick={()=>this.handlePageNum(page)}>{page}</a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
        
    )
  }
}
