import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {CourseService,Course} from '../course/shared';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {UtilityService} from '../../shared';

@Component({
    selector: 'admin-course-list',
    templateUrl: './admin-course-list.component.html',
    styleUrls: ['./admin-course-list.component.less'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminCourseListComponent implements OnInit{
    courses:any[];
    hiddenCourses:boolean[]=[];
    checkedCourses:boolean[]=[];
    loading = false;
    sortAsc ={};
    constructor(private courseService:CourseService,
    private router:Router,
    private utilityService: UtilityService){
        
    }

    async ngOnInit():Promise<void>{
        this.courses=await this.courseService.getAllCourses();
        for(var i =0; i<this.courses.length;i++){
            if(this.courses[i]["professorsNames"]){
            this.courses[i]["professorsNames"]=this.courses[i]["professorsNames"].split(',');
            }
            if(this.courses[i]["studentsNames"]){
                this.courses[i]["studentsNames"]=this.courses[i]["studentsNames"].split(',');
                }
        }
        this.courses=this.utilityService.sortArray(this.courses,"courseName",true);
        this.hiddenCourses=new Array(this.courses.length);
        this.checkedCourses=new Array(this.courses.length);
        this.hiddenCourses.fill(true);
        this.checkedCourses.fill(false);
        this.sortAsc ={
            "courseName":true,
            "courseCode":true,
            "semester":true,
            "studyLevel":true,
        };
    }

    private collapse(i){
        this.hiddenCourses[i]=!this.hiddenCourses[i];
    }
    
    private selectAll(value){
        this.checkedCourses.fill(value);
    }

    private select(value,index){
        this.checkedCourses[index]=value;
    }
    
    public async CreateCourse():Promise<any>{
        this.courseService.changeCourse({});        
        this.router.navigate(["/course/create/"]);        
    }

    public async DeleteCourse(course:any):Promise<any>{
        await this.courseService.DeleteCourse(course.courseID);
        this.ngOnInit();
    }

    public async EditCourse(course:any):Promise<any>{
        this.courseService.changeCourse(course);
        this.router.navigate(["/course/create/"]);
    }

    public async DeleteCheckedCourses():Promise<any>{
        for(var i =0;i<this.checkedCourses.length;i++){
            if(this.checkedCourses[i]){
                await this.courseService.DeleteCourse(this.courses[i].courseID);
            }
        }
        this.ngOnInit();
    }

    public sortCourses(key:string){
        this.hiddenCourses.fill(true);
        this.checkedCourses.fill(false);
        this.courses = this.utilityService.sortArray(this.courses,key,this.sortAsc[key]);
        this.sortAsc[key] = !this.sortAsc[key];
    }
}

