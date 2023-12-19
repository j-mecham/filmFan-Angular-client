import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss']
})
export class DirectorDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { director: any}) { }

  ngOnInit(): void {
  }

  get hasDeathDate(): boolean{
    console.log(this.data.director.Death.length)
    return this.data.director.Death?.length
  }

}
