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
  private scheduleDate = this.changeDate(new Date(), -31);

  //Semesters according to the year of Study
  private firstYearSemesters:string[] = ["1","2"];
  private secondYearSemesters:string[] = ["3","4"];
  private thirdYearSemesters:string[] = ["5","6"];

  private weekDays:string[] = ["PON", "UTO", "SRI", "CET", "PET", "SUB"];
  private weekDates:string[] = [];
  private scheduleTime = [{"start":"08:00","end":"09:30"}, 
  {"start":"09:45","end":"11:15"}, {"start":"11:30","end":"13:00"}, 
  {"start":"13:15","end":"14:45"}, {"start":"15:00","end":"16:30"}, 
  {"start":"16:45","end":"18:15"}, {"start":"18:30","end":"20:00"}, 
  {"start":"20:15","end":"21:45"}];

  ngOnInit() {
    this.getWeekSchedule();
  }

  //Set schedule courses properties and show all courses
  private setWeekSchedule() {
    for (let i=0;i<this.courses.length;i++) {
      for (let j=0;j<this.courses[i]["subject"].length;j++) {
        //Course details
        let start:string = this.courses[i]["subject"][j]["pocetak"][0];
        let end:string = this.courses[i]["subject"][j]["kraj"][0];
        let text:string = this.courses[i]["subject"][j]["predmet"][0]["_"];
        let startTime:Date = new Date (new Date().toDateString() + ' ' + start);
        let endTime:Date = new Date (new Date().toDateString() + ' ' + end);
        let duration:number = Math.round((endTime.getTime() - startTime.getTime())/60000)/60;
        
        //New element position
        let row:number = this.scheduleTime.indexOf(this.scheduleTime.find(o => o.start === start))+1;
        let column:number = i+1;
        let element = document.getElementById(row+","+column);

        //Schedule element
        let p = document.createElement("p");
        p.style.backgroundColor = "lightblue";
        p.innerHTML = text;
        p.style.width = "100%";
        p.style.position = "absolute";
        p.style.top = "0";
        p.style.left = "0";
        p.style.margin = "0";
        p.style.fontSize = "12px";
        p.style.zIndex = "9999";
        p.style.height = (duration/1.5)*57.33 + "px";
        element.appendChild(p);
      }
    }
  }

  //Get courses for particular student (branch and year)
  private async getWeekSchedule() {
    for (let j=0;j<6;j++) {
      let date:string = this.getDateString(this.scheduleDate, "-");
      this.weekDates.push(this.getDateString(this.scheduleDate, "."));
      let scheduleUrl:string = 'https://www.ferit.unios.hr/raspored/';
      scheduleUrl += date + ".xml";
      let schedule:Object = await this.studentService.getSchedule(scheduleUrl);
      //console.log(schedule);
      if (schedule["stavkaRasporeda"] !== undefined) {
        let subjects = [];
        for(let i=0;i<schedule["stavkaRasporeda"].length;i++){
          if(schedule["stavkaRasporeda"][i]["smjer"][0]["$"]["idsmjer"] === "38" 
          && this.secondYearSemesters.includes(schedule["stavkaRasporeda"][i]["predmet"][0]["$"]["semestar"])){
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
    //console.log(this.courses);
    this.setWeekSchedule();
  }

  //Get year-month-day from date object
  private getDateString(date, option):string {
    let year:string = date.getUTCFullYear();
    let month:string = (date.getUTCMonth() + 1).toString();
    month.length === 1 ? month = this.addZero(month) : "";
    let day:string = date.getUTCDate().toString();
    day.length === 1 ? day = this.addZero(day) : "";
    if (option === "-") {
      return year + "-" + month + "-" + day;
    } else {  
      return day + "." + month + "." + year + ".";
    }
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