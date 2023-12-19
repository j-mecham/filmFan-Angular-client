import { Component, OnInit, Input } from '@angular/core';
//Use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//This import brings in the API calls created in Task 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
//Import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update-form',
  templateUrl: './profile-update-form.component.html',
  styleUrls: ['./profile-update-form.component.scss']
})
export class ProfileUpdateFormComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileUpdateFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  user: any = {};

  @Input() userInput = { Username: '', Password: '', Email: '', Birthday: '' };

  
  ngOnInit(): void {
    this.getUser();
    this.userInput.Username = this.user.Username;
    this.userInput.Email = this.user.Email;
    this.userInput.Birthday = formatDate(this.user.Birthday, "yyyy-MM-dd", "en-US");
  }

  getUser(): void {
    const userData = localStorage.getItem("user") || "{}";
    this.user = JSON.parse(userData);
    }

  //This function is responsible for sending the form inputs to the backend
  updateUser(): void {
    this.fetchApiData.editUser(this.userInput).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result;
      console.log(result)
      //Logic for a successful user update goes here
      this.dialogRef.close(); //This will close the modal on success.
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
      this.router.navigate(['profile']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
