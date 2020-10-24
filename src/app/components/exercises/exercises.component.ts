import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  enunciados: any = []

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.getEnunciados()
  }

  getEnunciados() {
    this.contentService
      .get()
      .subscribe( res => this.enunciados = res )
  }

}
