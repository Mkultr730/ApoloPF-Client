import { Observable } from 'rxjs';
import { ForumsService } from './../../services/forums.service';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { User } from 'src/app/models/user.model';
import { Attempt } from 'src/app/models/attempts';
import { Chart } from 'node_modules/chart.js';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit, AfterContentInit {

  @ViewChild('test') canvasRef: ElementRef;

  cid: string;
  eid: string;
  student: Observable<User>;
  ctx;

  constructor(
    private route: ActivatedRoute,
    private forumsService: ForumsService,
    private elementRef: ElementRef
    ) { }

  ngOnInit(): void {
    /*
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
    var chart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });*/
  }

  ngAfterViewInit() {
    this.eid = this.route.snapshot.paramMap.get('eid');
    this.cid = this.route.snapshot.paramMap.get('cid');
    this.student = this.forumsService.getUserInfo(this.eid);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      console.log(this.canvasRef.nativeElement)
      this.ctx = this.canvasRef.nativeElement.getContext('2d');
      var chart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }, 100);
  }

  getNotaMx(intentos: Array<Attempt>): number {
    let mx: number = 0;
    intentos.forEach(e => {
      if (e.score > mx) {
        mx = e.score;
      }
    });
    return mx * 100;
  }

  getTimeProm(intentos: Array<Attempt>): string {
    let prom: number = 0;
    intentos.forEach(e => {
      prom = prom + e.time;
    });
    return new Date(prom / intentos.length * 1000).toISOString().substr(11, 8);
  }

}
