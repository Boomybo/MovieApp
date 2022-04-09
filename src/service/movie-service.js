
import UserErrors from "../UserErrors/UserError"

export default class MovieDB {
    _apiBaseMovies = "https://api.themoviedb.org/3/search/movie?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1&query="

    _apiBaseMovie = "https://api.themoviedb.org/3/movie/"

    async getMovies(url, pageNumber) {

        let res = await fetch(`${this._apiBaseMovies}${url}&page=${pageNumber}`)

        if (!res.ok) {
            throw new UserErrors(`Cant fetch ${url}, received ${res.status}`, res.status)
        }
        return await res.json()
    }

    async createGuestSession() {
        let res = await fetch("https://api.themoviedb.org/3/authentication/guest_session/new?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1")

        if (!res.ok) {
            throw new UserErrors(`Cant fetch, received ${res.status}`, res.status)
        }
        return await res.json()
    }

    async getGenres(id) {
        let res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1`)

        if (!res.ok) {
            throw new UserErrors(`Cant fetch, received ${res.status}`, res.status)
        }
        return await res.json()
    }

    async getRatedMovies(guest_session_id) {
        let res = await fetch(`https://api.themoviedb.org/3/guest_session/${guest_session_id}/rated/movies?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1&sort_by=created_at.asc`)

        if (!res.ok) {
            throw new UserErrors(`Cant fetch, received ${res.status}`, res.status)
        }
        return await res.json()
    }

    async postMovieRate(movie_id, guest_session_id, rate) {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1&guest_session_id=${guest_session_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({'value': rate})
        })

        return await response.json();

    }
}
