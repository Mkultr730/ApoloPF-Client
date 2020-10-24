import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  enunciados: any = [];

  constructor(private contentService: ContentService, private location: Location) { }

  ngOnInit(): void {
    this.getEnunciados();
  }

  getEnunciados() {
    this.contentService
      .get()
      .subscribe( res => this.enunciados = res )
  }

  backButton() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
