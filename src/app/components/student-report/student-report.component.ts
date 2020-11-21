import { Observable } from 'rxjs';
import { ForumsService } from './../../services/forums.service';
import { AfterContentInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Attempt, LessonAttempt } from 'src/app/models/attempts';
import { Chart } from 'node_modules/chart.js';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit, AfterContentInit {

  @ViewChildren('canvas') canvasRef: QueryList<ElementRef>;

  cid: string;
  eid: string;
  student: Observable<User>;
  attemps_Data: Array<LessonAttempt>;
  ctx;
  data: Array<number> = [];


  constructor(
    private route: ActivatedRoute,
    private forumsService: ForumsService
    ) { }

  ngOnInit(): void {
    this.eid = this.route.snapshot.paramMap.get('eid');
    this.cid = this.route.snapshot.paramMap.get('cid');
    this.student = this.forumsService.getUserInfo(this.eid);
    this.student.subscribe(user => {
      this.attemps_Data = user.lessons;
      console.log(user)
    })
  }


  ngAfterContentInit() {
    setTimeout(() => {
      // console.log(this.canvasRef.nativeElement);
      this.canvasRef.forEach((item, index) => {
        let lesson = this.attemps_Data[index].attempts;
        console.log(lesson, 'xLección')
        let i: Array<string> = [];
        lesson.forEach((item, index) => {
          this.data.push(item.score*100);
          i.push((index+1)+"");
        })
        let ctx = item.nativeElement.getContext('2d');
        var chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: i,
            datasets: [{
              label: 'Puntaje',
              data: this.data,
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
        this.data = []
      });
    }, 2000);
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
