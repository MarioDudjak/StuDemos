import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {CourseService,Course} from '../course/shared';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'admin-course-create',
    templateUrl: './admin-course-create.component.html',
    styleUrls: ['./admin-course-create.component.less'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminCourseCreateComponent implements OnInit{
    newCourse:any = {};
    loading = false;
    create=true;
    constructor(private courseService:CourseService,
    private location:Location,
    private router:Router){
        
    }

    async ngOnInit():Promise<void>{
        this.courseService.currentCourse.subscribe(course => this.newCourse = course);
        if(this.newCourse.courseID){
            this.create=false;
        }
        else{
            this.newCourse = {};
        }
    }

    public async createCourse(f:NgForm):Promise<any>{
        this.loading = true;
        if(this.create){
            let newCourse = new Course(this.newCourse.courseName,this.newCourse.semester,this.newCourse.studyLevel,this.newCourse.courseCode, this.newCourse.professorsCodes);            
            let course = await this.courseService.CreateCourse(newCourse);
        }
        else{
            let newCourse = new Course(this.newCourse.courseName,this.newCourse.semester,this.newCourse.studyLevel,this.newCourse.courseCode, this.newCourse.professorsCodes);            
            let course = await this.courseService.UpdateCourse(this.newCourse.courseID,newCourse);
        }
        f.resetForm();
        this.loading=false;
        this.router.navigate(["/admin/course/list"]);        
    }

    public Cancel(){
        this.router.navigate(["/admin/course/list"]);
    }

}

