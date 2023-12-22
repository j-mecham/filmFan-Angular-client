// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component'; 
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  user = JSON.parse(localStorage.getItem('user') || '')

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  goToMovie(title: string): void {
    this.router.navigate(['movie/', title]);
    console.log("clicked")
  }

  public openGenreDialog(genre: any){
    this.dialog.open(GenreDialogComponent, { width: '400px', data: {genre: genre}});
  }

  public openDirectorDialog(director: any){
    this.dialog.open(DirectorDialogComponent, { width: '400px', data: {director: director}});
  }

  public openSynopsisDialog(synopsis: any){
    this.dialog.open(SynopsisDialogComponent, { width: '400px', data: {synopsis: synopsis}});
  }

  public getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }

  public isFavorite(movieId: string) : boolean{
    return this.user.FavoriteMovies.includes(movieId);
  }

  public addFavorite(movieId: string){
    this.user.FavoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((response) => {
      console.log(response);
    })
    this.snackBar.open('Movie added to Favorites List!', 'OK', {duration: 2000});
  }

  public deleteFavorite(movieId: string){
    let favorites = this.user.FavoriteMovies.filter((id: string) => id != movieId);
    this.user.FavoriteMovies = favorites;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe((response) => {
      console.log(response);
    })
    this.snackBar.open('Movie deleted from Favorites List!', 'OK', {duration: 2000});
  }


}
