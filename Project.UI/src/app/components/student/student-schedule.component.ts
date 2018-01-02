import { Component, OnInit } from '@angular/core';
import {Student} from './shared/student.model';
import {StudentService} from './shared/student.service';
import { NgForm } from '@angular/forms';
import {Course} from '../course/shared';

@Component({
  selector: 'student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.less']
})

export class StudentScheduleComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  ngOnInit() {
    //Current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth()+1;
  }
  
}
