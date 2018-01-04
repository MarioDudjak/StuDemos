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

  //Logged student
  private studentGroup:string;
  private studentSemester:string[];
  private demoCode:string;
  private demoHours:Object[];
  private studentId:string;

  private courses:Object[] = [];
  //private scheduleDate = this.getMondayDate();
  private scheduleDate = this.changeDate(new Date(), +4);

  //Semesters according to the year of Study
  private firstYearSemesters:string[] = ["1","2"];
  private secondYearSemesters:string[] = ["3","4"];
  private thirdYearSemesters:string[] = ["5","6"];
  //Schedule days, dates and time
  private weekDays:string[] = ["PON", "UTO", "SRI", "CET", "PET", "SUB"];
  private weekDates:string[] = [];
  private scheduleTime = [{"start":"08:00","end":"09:30"}, 
  {"start":"09:45","end":"11:15"}, {"start":"11:30","end":"13:00"}, 
  {"start":"13:15","end":"14:45"}, {"start":"15:00","end":"16:30"}, 
  {"start":"16:45","end":"18:15"}, {"start":"18:30","end":"20:00"}, 
  {"start":"20:15","end":"21:45"}];

  async ngOnInit() {
    let student:Object = await this.studentService.getStudentDetails();
    let idStudent:string = await this.studentService.getId();
    this.setStudentData(student, idStudent);
    this.getWeekSchedule();
  }

  //Set student details
  private setStudentData(student:Object, id:string) {
    this.studentGroup = student["branch"];
    this.demoCode = student["demonstrationCode"];
    if (this.firstYearSemesters.includes(student["semester" ])) {
      this.studentSemester = this.firstYearSemesters;
    } else if (this.secondYearSemesters.includes(student["semester"])) {
      this.studentSemester = this.secondYearSemesters;
    } else {
      this.studentSemester = this.thirdYearSemesters;
    }
    this.demoHours = student["already-chosen"];
    this.studentId = id;
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
        let courseGroup:string = this.courses[i]["subject"][j]["grupastudenata"][0]["_"];
        //Course details - show on hover
        let courseType:string = this.courses[i]["subject"][j]["vrstanastave"][0]["_"];
        let courseCode:string = this.courses[i]["subject"][j]["predmet"][0]["$"]["sifra"];
        let courseLecturer:string = this.courses[i]["subject"][j]["nastavnik"][0]["_"];
        let courseRoom:string = this.courses[i]["subject"][j]["prostorija"][0]["_"];
        let courseDuration:string = " (" + this.courses[i]["subject"][j]["odradjeno"][0] + "/"+
                                    this.courses[i]["subject"][j]["planirano"][0] + ")";
        
        //New element position
        let row:number = this.scheduleTime.indexOf(this.scheduleTime.find(o => o.start === start))+1;
        let column:number = i+1;

        let element;
        let p = document.createElement("p");
        let div = document.createElement("div");
        let span = document.createElement("span");

        if (row === 0) {
          element = document.getElementById("s,"+column);
          let r:number = ((startTime.getHours()*60+startTime.getMinutes()) - 8*60)/105;
          p.style.top = (r*67+66) +"px";
          div.style.top = (r*67+66+15) +"px";
        } else {
          element = document.getElementById(row+","+column);
        }

        //Schedule element
        span.className = "parent-course-element";
        element.appendChild(span);
        p.className = "schedule-element";
        if (courseCode.includes(this.demoCode)) {
          if (this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start && o["student"] === this.studentId)) !== undefined) {
            p.classList.add("schedule-demo-my");
          } else if (this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start)) !== undefined) {
            p.classList.add("schedule-demo-chosen");
          } else {
            p.classList.add("schedule-demo-available");
          }
        }
        p.innerHTML = "<div>"+text+" "+courseGroup+"</div><div>"+courseRoom+courseDuration+"</div>";
        p.style.height = (duration/1.5)*57.33-3 + "px";
        span.appendChild(p);
        div.className = "schedule-details";
        div.innerHTML = "<div>"+courseType+"</div><div class='yellow-detail'>"+text+" "+courseCode+"</div><div>"+start+
        " - "+end+"</div><div class='yellow-detail'>"+courseLecturer+"</div><div><span class='yellow-detail'>"+courseRoom+
        "</span>"+courseDuration+"</div>";
        span.appendChild(div);
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
      if (schedule["stavkaRasporeda"] !== undefined) {
        let subjects = [];
        for(let i=0;i<schedule["stavkaRasporeda"].length;i++){
          let groupOfStudents:string = schedule["stavkaRasporeda"][i]["grupastudenata"][0]["_"];
          let currentSemester:string = schedule["stavkaRasporeda"][i]["predmet"][0]["$"]["semestar"];
          let courseCode:string = schedule["stavkaRasporeda"][i]["predmet"][0]["$"]["sifra"];
          let startT:string = schedule["stavkaRasporeda"][i]["pocetak"][0];
          let endT:string = schedule["stavkaRasporeda"][i]["kraj"][0];
          if((groupOfStudents.includes(this.studentGroup) && this.studentSemester.includes(currentSemester)) || courseCode === this.demoCode){
            let exist:boolean = false;
            if (subjects.length !== 0) {
              for (let obj of subjects) {
                if (obj["pocetak"][0] === startT && obj["kraj"][0] === endT) {
                  if (!obj["grupastudenata"][0]["_"].includes(schedule["stavkaRasporeda"][i]["grupastudenata"][0]["_"]) &&
                      obj["predmet"][0]["_"].includes(schedule["stavkaRasporeda"][i]["predmet"][0]["_"])) {
                    obj["grupastudenata"][0]["_"] += ", " + schedule["stavkaRasporeda"][i]["grupastudenata"][0]["_"];
                    exist = true;
                  }
                }
              }
            } 
            if (exist === false) {
              subjects.push(schedule["stavkaRasporeda"][i]);
            } 
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