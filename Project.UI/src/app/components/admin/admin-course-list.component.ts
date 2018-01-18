import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {CourseService,Course} from '../course/shared';
import { NgForm } from '@angular/forms';

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
    newCourse: any = {};    
    loading = false;
    constructor(private courseService:CourseService){
        
    }

    async ngOnInit():Promise<void>{
        this.courses=await this.courseService.getAllCourses();
        for(var i =0; i<this.courses.length;i++){
            if(this.courses[i]["professorsNames"]){
            this.courses[i]["professorsNames"]=this.courses[i]["professorsNames"].split(',');
            }
        }
        
        this.hiddenCourses=new Array(this.courses.length);
        this.checkedCourses=new Array(this.courses.length);
        this.hiddenCourses.fill(true);
        this.checkedCourses.fill(false);
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
    
    public async createCourse(f:NgForm):Promise<any>{
        this.loading = true;
        let newCourse = new Course(this.newCourse.courseName,this.newCourse.semester,this.newCourse.studyLevel,this.newCourse.courseCode, this.newCourse.professors);
        let course = await this.courseService.CreateCourse(newCourse);
        f.resetForm();
        this.ngOnInit();
        this.loading=false;
    }

    public async DeleteCourse(course:any):Promise<any>{
        await this.courseService.DeleteCourse(course.courseID);
        this.ngOnInit();
    }

    public async DeleteCheckedCourses():Promise<any>{
        for(var i =0;i<this.checkedCourses.length;i++){
            if(this.checkedCourses[i]){
                await this.courseService.DeleteCourse(this.courses[i].courseID);
            }
        }
        this.ngOnInit();
    }
}

