import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class MoviePageComponent {
  movie: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    private route: ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    var title = '';  
    this.route.params.subscribe(params=>{title=params['Title']})
    this.fetchApiData.getOneMovie(title).subscribe((resp: any) => {
        this.movie = resp;
        console.log(this.movie);
        return this.movie;
      });
  }

}
