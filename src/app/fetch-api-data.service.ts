import { Injectable } from '@angular/core';
// Do in need the /internal in the below import???
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://filmfanattic-8d1d52c1e608.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

   /**
    * @description Calls the API to make a new user.
    * @param {any} userDetails - User registration details.
    * @returns {Observable<any>} - Observable for the API response.
    */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to login a user.
    * @param {any} userDetails - User login details.
    * @returns {Observable<string>} - Observable for the API response.
    */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login?' + new URLSearchParams(userDetails), {}).pipe(
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to get all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
    */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to retrieve a movie by title.
    * @param {string} title - Title of the movie
    * @returns {Observable<any>} - Observable for the API response with requested movie.
    */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to retrieve a Director by name. 
    * @param {string} directorName - Name of the director.
    * @returns {Observable<any>} - Observable for the API response with requested director.
    */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to retrieve a Genre by name. 
    * @param {string} genreName - Name of the Genre.
    * @returns {Observable<any>} - Observable for the API response with requested genre.
    */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to retrieve a User by name. 
    * @param {string} username - Name of the User
    * @returns {Observable<any>} - Observable for the API response with requested user.
    */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to retrieve User's list of favorite movies.
    * @param {string} username - Name of the User
    * @returns {Observable<any>} - Observable for the API response with Favorites list.
    */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to add a movie to the users' Favorites list.
    * @param {string} movieId - ID of the movie to be added.
    * @returns {Observable<any>} - Observable for the API response.
    */
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    
    return this.http.post(apiUrl + `users/${user.Username}/movies/${movieId}`, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError),
    );
  }

  /**
    * @description Calls the API to edit the users' Information. 
    * @param {string} updatedUser - New information to update with.
    * @returns {Observable<any>} - Observable for the API response.
    */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username , updatedUser, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Calls the API to delete a User.
    * @returns {Observable<any>} - Observable for the API response.
    */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    return this.http.delete(apiUrl + 'users/' + user.Username, {
      responseType: 'text',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
    * @description Calls the API to delete a movie from the users' Favorites list.
    * @param {string} movieID - ID of the movie to be removed.
    * @returns {Observable<any>} - Observable for the API response.
    */
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const index = user.FavoriteMovies.indexOf(movieId);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http.delete(apiUrl + `users/${user.Username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
    */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
    * @description Handles and logs HTTP errors.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }

    return throwError('Something bad happened; please try again later.');
  }
}