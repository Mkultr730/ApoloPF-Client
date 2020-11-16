import { Observable } from 'rxjs';
import { ForumsService } from './../../services/forums.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {
  cid: string;
  eid: string;
  student: Observable<User>;
  constructor(private route: ActivatedRoute, private forumsService: ForumsService) { }

  ngOnInit(): void {
    this.eid = this.route.snapshot.paramMap.get('eid');
    this.cid = this.route.snapshot.paramMap.get('cid');
    this.student = this.forumsService.getUserInfo(this.eid);
  }

}
