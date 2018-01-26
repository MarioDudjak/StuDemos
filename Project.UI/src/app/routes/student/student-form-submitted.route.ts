import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../components/student/shared';

@Component({
  selector: 'student-form-submitted-route',
  templateUrl: 'student-form-submitted.route.html',
  styleUrls: ['./student-form-submitted.route.less'],
})

export class StudentFormSubmittedRoute implements OnInit{


  constructor(private studentService: StudentService) { }

  async ngOnInit(){
  }
}
