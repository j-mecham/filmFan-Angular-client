import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { ProfileUpdateFormComponent } from '../profile-update-form/profile-update-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent {
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    private router: Router,

    ) { }
    user: any = {};
    movies: any[] = [];
    favorites: any = [];


  ngOnInit(): void {
    this.getUser();
    this.getFavMovies();
  }

  /**
   * @description Gets favorite movies with FetchApiDataService.
   * @returns list of favorite movies.
   */
  public getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        for (var movie of this.movies) {
          if (this.user.FavoriteMovies.includes(movie._id.toString())) {
            this.favorites.push(movie)
            console.log(this.favorites)
          }
        }
        return this.favorites;
      });
    }

  /**
   * @description Navigates to movie's page.
   * @param {string} title - title of the movie.
   */
  goToMovie(title: string): void {
    this.router.navigate(['movie/', title]);
    console.log("clicked")
  }

  openUserUpdateDialog(): void {
    this.dialog.open(ProfileUpdateFormComponent, {
      width: '280px'
    });
  }

  getUser(): void {
    const userData = localStorage.getItem("user") || "{}";
    this.user = JSON.parse(userData);
    }

  get hasMovies(): boolean{
    return this.user.FavoriteMovies?.length
  }

  deleteCurrentUser(): void {
    if(window.confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((response) => {
        localStorage.clear();
        console.log(response)
        this.router.navigate(['welcome'])
      })
    }
  }
}
