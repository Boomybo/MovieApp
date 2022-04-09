import React from "react";

export default class SearchRated extends React.Component{

    onRatedBtn = () => {
        this.props.onRated()
        this.props.onRatedMovies()
    }

    onSearchBtn = () => {
        this.props.onSearch()
        
    }
    
    render() {

        return (
        <ul className="search-rated">
            <li className="option"><button className="header-btn" onClick={this.onSearchBtn}>Search</button></li>
            <li className="option"><button className="header-btn" onClick={this.onRatedBtn}>Rated</button></li>
        </ul> 
        )
    }
}