import React from "react";
//import MovieDB from "../service/service";


export default class Genre extends React.Component{

    state = {
        genres: [],
        isMounted: false
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        })
        this.getGenres()
    }

    getGenres = () => {
        const {getGenres, id} = this.props
        const {isMounted} = this.state
        if(isMounted) {
            getGenres(id)
        .then(val => val)
        .then(this.onGenreLoaded)
        }
    }

    onGenreLoaded = (val) => {
        this.setState({
            genres: val.genres
        })
    }

    genre() {
        const {genres} = this.state

        return genres.map(val => <li className="genre" key={val.id}>{val.name}</li>)
    }

    render() {
    
        return(
            <ul className="genres">
                {this.genre()}
            </ul>
        )
    }
}