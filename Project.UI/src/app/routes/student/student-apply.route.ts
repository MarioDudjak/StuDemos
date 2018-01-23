import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../components/student/shared';

@Component({
  selector: 'student-apply-route',
  templateUrl: 'student-apply.route.html',
  styleUrls: ['./student-apply.route.less'],
})

export class StudentApplyRoute implements OnInit{


  constructor(private studentService: StudentService) { }

  async ngOnInit(){
  }
}
