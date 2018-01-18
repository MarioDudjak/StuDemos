import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {ProfessorService} from '../professor/shared';

@Component({
    selector: 'admin-professor-list',
    templateUrl: './admin-professor-list.component.html',
    styleUrls: ['./admin-professor-list.component.css'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminProfessorListComponent implements OnInit{
    professors:any[] =[];
    hiddenCourses:boolean[]=[]
    checkedProfessors:boolean[]=[]
    constructor(private professorService:ProfessorService ){
        
    }

    async ngOnInit():Promise<void>{
        this.professors=await this.professorService.GetAllProfessors();
        this.hiddenCourses=new Array(this.professors.length);
        this.checkedProfessors=new Array(this.professors.length);
        this.hiddenCourses.fill(true);
        this.checkedProfessors.fill(false);
    }

    private collapse(i){
        this.hiddenCourses[i]=!this.hiddenCourses[i];
    }
    
    private selectAll(value){
        this.checkedProfessors.fill(value);
    }

    private select(event,index){

    }
}

