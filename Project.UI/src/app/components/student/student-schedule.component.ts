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

  private courses:Object[] = [];
  //private scheduleDate = this.getMondayDate();
  private scheduleDate = this.changeDate(new Date(), -30);

  ngOnInit() {
    this.getWeekSchedule();
  }

  private async getWeekSchedule() {
    for (let j=0;j<6;j++) {
      let date:string = this.getDateString(this.scheduleDate);
      let scheduleUrl:string = 'https://www.ferit.unios.hr/raspored/';
      scheduleUrl += date + ".xml";
      let schedule:Object = await this.studentService.getSchedule(scheduleUrl);
      //console.log(schedule);
      if (schedule["stavkaRasporeda"] !== undefined) {
        let subjects = [];
        for(let i=0;i<schedule["stavkaRasporeda"].length;i++){
          if(schedule["stavkaRasporeda"][i]["smjer"][0]["$"]["idsmjer"] === "38" 
          && schedule["stavkaRasporeda"][i]["predmet"][0]["$"]["semestar"] === "3"){
            //console.log(schedule);
            subjects.push(schedule["stavkaRasporeda"][i]);
          }
        }
        let element = {};
        element["date"] = date;
        element["subject"] = subjects;
        this.courses.push(element);
      }
      this.scheduleDate = this.changeDate(this.scheduleDate,1);
    }
    console.log(this.courses);
  }

  //Get year-month-day from date object
  private getDateString(date):string {
    let year:string = date.getUTCFullYear();
    let month:string = (date.getUTCMonth() + 1).toString();
    month.length === 1 ? month = this.addZero(month) : "";
    let day:string = date.getUTCDate().toString();
    day.length === 1 ? day = this.addZero(day) : "";
    return year + "-" + month + "-" + day;
  }

  //Get first monday date
  private getMondayDate() : Date {
    const d = new Date();
    return this.changeDate(d,-(d.getDay()-1));
  }

  //Change date
  private changeDate(date, days) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  //Add leading zero to date
  private addZero(num:string) : string {
    return "0" + num;
  }

}