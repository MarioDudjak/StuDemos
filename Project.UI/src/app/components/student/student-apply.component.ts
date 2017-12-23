import { Component, OnInit } from '@angular/core';
import {Student} from './shared/student.model';
import {StudentService} from './shared/student.service';
import { NgForm } from '@angular/forms';
import {Course} from '../course/shared';

@Component({
  selector: 'student-apply',
  templateUrl: './student-apply.component.html',
  styleUrls: ['./student-apply.component.less']
})

export class StudentApplyComponent implements OnInit {

  private model:any = {};
  private courseSelected:boolean[] = [];
  private disableSelect:boolean[] = [];
  private checkedCourses:Course[] = [];
  private academicYear:string;
  private semester:string;

  courses = [
     new Course(0, 'Fizika', 'Sveučilišni preddiplomski studij' ),
     new Course(1, 'Programiranje 1', 'Sveučilišni preddiplomski studij' ),
     new Course(2, 'Mreže računala', 'Sveučilišni diplomski studij' ),
     new Course(3, 'Dizajn računalnih sustava', 'Sveučilišni diplomski studij'),
     new Course(4, 'Internet programiranje', 'Sveučilišni diplomski studij' ),
     new Course(5, 'Razvoj mobilnih aplikacija', 'Sveučilišni diplomski studij')
  ];

  constructor(private studentService:StudentService) { }

  ngOnInit() {
    //Set courseSelected and disableSelect array on false at the beginning because courses are not selected
    for(let i=0;i<this.courses.length;i++) {
      this.courseSelected.push(false);
      this.disableSelect.push(false);
    }

    //Set current academic year
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextYear = currentYear+1;
    this.academicYear = (currentYear+"./"+nextYear+".").toUpperCase();
    
    //Set current semester
    const winterSemesterApplyForm = [4,5,6,7,8,9,10];
    const summerSemesterApplyForm = [11,12,1,2,3];
    const currentMonth = currentDate.getMonth()+1;
    this.semester = summerSemesterApplyForm.includes(currentMonth) ? "LJETNI" : "ZIMSKI";
  }

  //Move course position up
  courseUp(i) {
    let from = i;
    let to = from - 1;
    if(to >= 0) {
      this.changePlace(from, to);
    }
  }

  //Move course position down
  courseDown(i) {
    let from = i;
    let to = from + 1;
    if(to < this.checkedCourses.length) {
      this.changePlace(from, to);
    }
  }

  //Change course position in checkedCourses array
  changePlace(from, to) {
      this.checkedCourses.splice(to, 0, this.checkedCourses.splice(from, 1)[0]);
  }

  //If 5 checkboxes are checked, disable checking new courses
  checkboxChanged() {
    let numOfSelectedCourses = this.courseSelected.filter(function(x){return x === true}).length;
    if(numOfSelectedCourses > 4) {
      for(let i=0;i<this.courses.length;i++) {
        this.disableSelect[i] = !this.courseSelected[i];
      }
    } else {
      this.disableSelect.fill(false);
    }
  }

  //On modal submit fill checkedCourses array with selected courses
  checkboxSubmit() {
    this.checkedCourses = [];
    for(let i=0;i<this.courses.length;i++) {
      if(this.courseSelected[i]) {
        this.checkedCourses.push(this.courses[i]);
      }
    }
    //console.log(this.checkedCourses);
  }

  register(myForm:NgForm) {
    console.log('Successful!');
    console.log(myForm);
  }
  
}
