import UserErrors from './UserErrors/UserError';

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3/';

  _apiKey = 'api_key=cebc84ab1d17ead9d5402d3d6b93ddc1';

  async getFetch(query) {
    let res = await fetch(`${this._apiBase}${query}`);

    if (!res.ok) {
      throw new UserErrors(`Cant fetch, received ${res.status}`, res.status);
    }
    return await res.json();
  }

  async requestForMovies(url, pageNumber) {
    return await this.getFetch(`search/movie?${this._apiKey}&query=${url}&page=${pageNumber}`);
  }

  async createGuestSession() {
    return await this.getFetch(`authentication/guest_session/new?${this._apiKey}`);
  }

  async getGenres(id) {
    return await this.getFetch(`movie/${id}?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1`);
  }

  async getRatedMovies(guest_session_id) {
    return await this.getFetch(`guest_session/${guest_session_id}/rated/movies?${this._apiKey}&sort_by=created_at.asc`);
  }

  async getAllGenres() {
    return await this.getFetch(`genre/movie/list?${this._apiKey}`);
  }

  async postMovieRate(movie_id, guest_session_id, rate) {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=cebc84ab1d17ead9d5402d3d6b93ddc1&guest_session_id=${guest_session_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rate }),
      }
    );

    return await response.json();
  }
}
