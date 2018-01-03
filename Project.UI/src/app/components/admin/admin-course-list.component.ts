import {Component,ViewEncapsulation, OnInit} from '@angular/core';

@Component({
    selector: 'admin-course-list',
    templateUrl: './admin-course-list.component.html',
    styleUrls: ['./admin-course-list.component.css'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminCourseListComponent implements OnInit{
    courses:any[] =[];
    hiddenCourses:boolean[]=[]
    checkedCourses:boolean[]=[]
    constructor(){
        
    }

    async ngOnInit():Promise<void>{
        this.courses=new Array(4);
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

    private select(event,index){

    }
}

