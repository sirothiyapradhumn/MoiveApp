import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', background:'white',color: "#2596be", padding:'1rem', justifyContent:'center', alignContent:'center'}}>
            <Link to="/" style={{textDecoration:"none"}}><h1>Movie App</h1></Link> 
            <Link to="/fav" style={{textDecoration:"none"}}><h2 style={{marginLeft:'2rem', marginTop: '0.5rem'}}>Favourites</h2></Link> 
        </div>

    )
  }
}
