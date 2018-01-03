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

  private scheduleUrl:string = 'https://www.ferit.unios.hr/raspored/';

  async ngOnInit() {
    const scheduleDate:string = this.getMondayDate();
    this.scheduleUrl += scheduleDate + ".xml";

    this.scheduleUrl = 'https://www.ferit.unios.hr/raspored/2017-12-04.xml';

    let schedule:Object = await this.studentService.getSchedule(this.scheduleUrl);
    //console.log(schedule);
  }

  //Get first monday date
  private getMondayDate() : string {
    const d = new Date();
    let year:string = d.getFullYear().toString();
    let month:string = (d.getMonth() + 1).toString();
    month.length === 1 ? month = this.addZero(month) : month;
    let monday:string = (d.getDate() - d.getDay() + 1).toString();
    monday.length === 1 ? monday = this.addZero(monday) : monday;
    return year + "-" + month + "-" + monday;
  }

  //Set month or day value
  private addZero(num:string) : string {
    return "0" + num;
  }

}