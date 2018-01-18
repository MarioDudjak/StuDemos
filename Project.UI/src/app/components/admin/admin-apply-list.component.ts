import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {ApplicationService} from '../application/shared';

@Component({
    selector: 'admin-apply-list',
    templateUrl: './admin-apply-list.component.html',
    styleUrls: ['./admin-apply-list.component.css'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminApplyListComponent implements OnInit{
    applications:any[] =[];
    hiddenCourses:boolean[]=[]
    checkedApplications:boolean[]=[]
    constructor(private applicationService:ApplicationService){
        
    }

    async ngOnInit():Promise<void>{
        this.applications=await this.applicationService.getAllApplications();
        this.hiddenCourses=new Array(this.applications.length);
        this.checkedApplications=new Array(this.applications.length);
        this.hiddenCourses.fill(true);
        this.checkedApplications.fill(false);
    }

    private collapse(i){
        this.hiddenCourses[i]=!this.hiddenCourses[i];
    }
    
    private selectAll(value){
        this.checkedApplications.fill(value);
    }

    private select(event,index){

    }
}

