import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ProfessorService} from '../professor/shared';

@Component({
    selector: 'admin-professor-create',
    templateUrl: './admin-professor-create.component.html',
    styleUrls: ['./admin-professor-create.component.less'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminProfessorCreateComponent implements OnInit{
    newProfessor:any = {};
    loading = false;
    create=true;
    constructor(private professorService:ProfessorService,
    private location:Location,
    private router:Router){
        
    }

    async ngOnInit():Promise<void>{
        this.professorService.currentProfessor.subscribe(prof => this.newProfessor = prof);
        if(this.newProfessor.id){
            this.create=false;
        }
        else{
            this.newProfessor = {};
        }
    }

    public async createProfessor(f:NgForm):Promise<any>{
        this.loading = true;
        if(this.create){
            //let newProfessor = new Course(this.newProfessor.courseName,this.newProfessor.semester,this.newProfessor.studyLevel,this.newProfessor.courseCode, this.newProfessor.professorsCodes);            
            let professor = await this.professorService.createProfessor(this.newProfessor);
        }
        else{
            //let newProfessor = new Course(this.newProfessor.courseName,this.newProfessor.semester,this.newProfessor.studyLevel,this.newProfessor.courseCode, this.newProfessor.professorsCodes);            
            //let course = await this.courseService.UpdateCourse(this.newProfessor.courseID,newProfessor);
        }
        f.resetForm();
        this.loading=false;
        this.router.navigate(["/admin/professor/list"]);        
    }

    public Cancel(){
        this.router.navigate(["/admin/professor/list"]);
    }

}

