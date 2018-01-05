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

  //Semesters according to the year of Study
  private firstYearSemesters:string[] = ["1","2"];
  private secondYearSemesters:string[] = ["3","4"];
  private thirdYearSemesters:string[] = ["5","6"];

  //Schedule courses, monday date, days, dates and time
  private courses:Object[] = [];
  //private scheduleDate = this.getMondayDate();
  private scheduleDate = this.changeDate(new Date(), +2);
  private weekDays:string[] = ["PON", "UTO", "SRI", "CET", "PET", "SUB"];
  public weekDates:string[] = [];
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
    document.getElementById("normalSchedule").classList.add("active");
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
        //Append courses elements
        this.appendNewElements(i, j);
      }
    }
  }

  //Append courses elements
  private appendNewElements(i:number, j:number) {
    let text:string = this.courses[i]["subject"][j]["predmet"][0]["_"];
    let start:string = this.courses[i]["subject"][j]["pocetak"][0];
    let courseCode:string = this.courses[i]["subject"][j]["predmet"][0]["$"]["sifra"];
    //New element position
    let row:number = this.scheduleTime.indexOf(this.scheduleTime.find(o => o.start === start))+1;
    let column:number = i+1;
    //Schedule elements
    let element:Element;
    let span:Element = this.createSpanElement(i, j);
    let plus:Element = this.createPlusElement(i, j);
    let p:Element = this.createPElement(i, j, row, start, text, courseCode);
    let div:Element = this.createDivElement(i, j, row, text, courseCode, start);
    if (row === 0) {
      element = document.getElementById("s,"+column);
    } else {
      element = document.getElementById(row+","+column);
    }
    element.appendChild(span);
    if (courseCode.includes(this.demoCode)) {
      let myCourse = this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start && o["student"] === this.studentId));
      let smnCourse = this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start));
      if ( (myCourse === undefined) && (smnCourse === undefined) ) {
          span.appendChild(plus);
      }
    }
    span.appendChild(p);
    span.appendChild(div);
  }

  //Span element - course elements container
  private createSpanElement(i:number, j:number): Element {
    let span = document.createElement("span");
    span.className = "parent-course-element p"+i+","+j;
    return span;
  }

  //Plus button for selecting a course
  private createPlusElement(i:number, j:number): Element {
    let plus = document.createElement("button");
    plus.className = "select-course-button";
    plus.addEventListener("click", this.selectDemoCourse.bind(this));
    return plus;
  }

  //P element - main course schedule element
  private createPElement(i:number, j:number, row:number, start:string, text:string, courseCode:string): Element {
    //Course details
    let end:string = this.courses[i]["subject"][j]["kraj"][0];
    let endTime:Date = new Date (new Date().toDateString() + ' ' + end);
    let duration:number = Math.round((endTime.getTime() - new Date (new Date().toDateString() + ' ' + start).getTime())/60000)/60;
    let courseGroup:string = this.courses[i]["subject"][j]["grupastudenata"][0]["_"];
    let roomAndDuration = this.getCourseRoomAndDuration(i, j);

    let p = document.createElement("p");
    if (row === 0) {
      p.style.top = (this.calculateHeight(i, j)*69+66) +"px";
    }
    p.className = "schedule-element";
    if (courseCode.includes(this.demoCode)) {
      if (this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start && o["student"] === this.studentId)) !== undefined) {
        p.classList.add("schedule-demo-my");
      } else if (this.demoHours.find(o => (o["date"] === this.weekDates[i] && o["time"] === start)) !== undefined) {
        p.classList.add("schedule-demo-chosen");
      } else {
        p.classList.add("schedule-demo-available");
        p.style.paddingRight = "13px";
      }
    }
    p.innerHTML = "<div>"+text+" "+courseGroup+"</div><div>"+roomAndDuration[0]+roomAndDuration[1]+"</div>";
    p.style.height = (duration/1.5)*58 + "px";
    return p;
  }

  //Div element - course details on hover
  private createDivElement(i:number, j:number, row:number, text:string, courseCode:string, start:string): Element {
    let div = document.createElement("div");
    if (row === 0) {
      let r:number = this.calculateHeight(i, j);
      div.style.top = (r*69+66+15) +"px";
    }
    div.className = "schedule-details";
    div.innerHTML = this.setTextToHoverDiv(i, j, text, courseCode, start);
    return div;
  }

  //Calculate height of course p element
  private calculateHeight(i:number, j:number): number {
    let startTime:Date = new Date (new Date().toDateString() + ' ' + this.courses[i]["subject"][j]["pocetak"][0]);
    return ((startTime.getHours()*60+startTime.getMinutes()) - 8*60)/105;
  }

  //Set inner html of hover div - course details
  private setTextToHoverDiv(i:number, j:number, text:string, courseCode:string, start:string): string {
    //Course details - show on hover
    let courseType:string = this.courses[i]["subject"][j]["vrstanastave"][0]["_"];
    let courseLecturer:string = this.courses[i]["subject"][j]["nastavnik"][0]["_"];
    let end:string = this.courses[i]["subject"][j]["kraj"][0];
    let roomAndDuration = this.getCourseRoomAndDuration(i, j);

    return "<div>"+courseType+"</div><div class='yellow-detail'>"+text+" "+courseCode+"</div><div id="+start+">"
    +start+" - "+end+"</div><div class='yellow-detail' id="+courseCode+">"+courseLecturer+
    "</div><div><span class='yellow-detail'>"+roomAndDuration[0]+"</span>"+roomAndDuration[1]+"</div>";
  }

  //Get room and duration of current course
  private getCourseRoomAndDuration(i:number, j:number): Array<string> {
    let courseRoom:string = this.courses[i]["subject"][j]["prostorija"][0]["_"];
    let done:string = this.courses[i]["subject"][j]["odradjeno"][0];
    let toDo:string = this.courses[i]["subject"][j]["planirano"][0];
    let courseDuration:string = " (" + done + "/" + toDo + ")";
    return [courseRoom, courseDuration];
  }
 
  //On element selected (click) - change classes and save changes
  private selectDemoCourse(e) {
    let spanId = e.path[1].classList[1];
    if (spanId !== undefined && spanId.includes("p")) {
      let el = document.getElementsByClassName(spanId)[0];
      let time = el.children[2].getElementsByTagName("div")[2].id;
      let code = el.children[2].getElementsByTagName("div")[3].id;
      let date = this.weekDates[spanId.substring(1,2)];
      el.children[1].classList.remove("schedule-demo-available");
      el.children[1].classList.add("schedule-demo-my");
      el.removeChild(el.childNodes[0]);
      this.studentService.setMyDemoCourse(code, date, time);
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
        let subjects:Object[] = this.getAllDaySubjects(schedule);
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

  //Get all subjects for one day
  private getAllDaySubjects(schedule:Object): Array<Object> {
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
    return subjects;
  }

  //Get year-month-day from date object
  private getDateString(date:Date, option:string): string {
    let year:string = date.getUTCFullYear().toString();
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
  private getMondayDate(): Date {
    const d:Date = new Date();
    return this.changeDate(d,-(d.getDay()-1));
  }

  //Change date
  private changeDate(date:Date, days:number): Date{
    let newDate:Date = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  //Add leading zero to date
  private addZero(num:string): string {
    return "0" + num;
  }

// *** Sidebar - schedule functionalities ***
  private setActiveClass(id:string) {
    if (document.getElementsByClassName("active")[0] !== undefined) {
      document.getElementsByClassName("active")[0].classList.remove("active");
    }
    document.getElementById(id).classList.add("active");
  }

  private returnNormalSchedule() {
    let displayNormal:NodeListOf<Element> = document.querySelectorAll(".element-display-none");
    [].forEach.call(displayNormal, function(dn) {
        dn.classList.remove("element-display-none");
    });
  }

  private normalSchedule(id:string) {
    this.setActiveClass(id);
    this.returnNormalSchedule();
  }

  private mySchedule(id:string) {
    this.setActiveClass(id);
    this.returnNormalSchedule();
    let myCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-demo-available, .schedule-demo-my, .schedule-demo-chosen");
    [].forEach.call(myCourses, function(dc) {
        dc.parentElement.classList.add("element-display-none");
    });
  }

  private demoSchedule(id:string) {
    this.setActiveClass(id);
    this.returnNormalSchedule();
    let demoCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
    [].forEach.call(demoCourses, function(dc) {
        if(dc.classList.length === 1) {
          dc.parentElement.classList.add("element-display-none");
        }
    });
  }

  private chosenDemo(id:string) {
    this.setActiveClass(id);
    this.returnNormalSchedule();
    let selectedCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
    [].forEach.call(selectedCourses, function(sc) {
        if(!sc.classList.contains('schedule-demo-my')) {
          sc.parentElement.classList.add("element-display-none");
        }
    });
  }

  private availableDemo(id:string) {
    this.setActiveClass(id);
    this.returnNormalSchedule();
    let availableCourses:NodeListOf<Element> = document.querySelectorAll(".schedule-element");
    [].forEach.call(availableCourses, function(ac) {
        if(!ac.classList.contains('schedule-demo-available')) {
          ac.parentElement.classList.add("element-display-none");
        }
    });
  }

}
