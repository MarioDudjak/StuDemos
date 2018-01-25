import { Component, OnInit } from '@angular/core';
import {StudentService} from './shared/student.service';
import { NgForm } from '@angular/forms';
import {Course} from '../course/shared';
import {ApplicationService,Apply,Selection} from '../application/shared';
import {CourseService} from '../course/shared';
import {User} from '../../shared';
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
  private courseGrade:string[] = [];
  private academicYear:string;
  private semester:string;
  private courses:Course[];
  private disableFirstNameInput:boolean = false;
  private disableLastNameInput:boolean = false;

  constructor(private studentService:StudentService,
  private applicationService:ApplicationService,
  private courseService: CourseService,
  ) { }

  async ngOnInit() {   
    this.courses= await this.courseService.getAllCourses();
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

    //Set student name
    this.model.firstName = localStorage.getItem('firstName');
    this.model.lastName = localStorage.getItem('lastName');
    if(this.model.firstName !== "" && this.model.firstName !== undefined) this.disableFirstNameInput = true;
    if(this.model.lastName !== "" && this.model.lastName !== undefined) this.disableLastNameInput = true;
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
      this.courseGrade.splice(to, 0, this.courseGrade.splice(from, 1)[0]);
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
  }

  async register(myForm:NgForm){
    var selectionsSize=this.checkedCourses.length;
    var selections = new Array(selectionsSize);
    for(var i=0;i<selectionsSize;i++){
      let grade:number = parseInt(this.courseGrade[i],10);
      var selection = new Selection(i+1,grade,this.checkedCourses[i]["courseID"],this.checkedCourses[i]["courseName"]);
      selections[i]=selection;
    }
    var apply= new Apply(this.model.firstName,this.model.lastName,this.model.averageGrade,this.model.demonstrationHours,0,selections,localStorage.getItem('userId'));
    let response = await this.applicationService.CreateApplication(apply);
  }
  
}
