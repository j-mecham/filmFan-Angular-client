import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { ProfileUpdateFormComponent } from '../profile-update-form/profile-update-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent {
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog
    ) { }
    user: any = {};


  ngOnInit(): void {
    this.getUser();
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
}
