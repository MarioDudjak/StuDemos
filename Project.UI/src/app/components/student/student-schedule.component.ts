import { Component, OnInit } from '@angular/core';
import { StudentService } from './shared/student.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'student-schedule',
  templateUrl: './student-schedule.component.html',
  styleUrls: ['./student-schedule.component.less']
})

export class StudentScheduleComponent implements OnInit {

  constructor(private studentService:StudentService) { }

  async ngOnInit() {
   }

}
