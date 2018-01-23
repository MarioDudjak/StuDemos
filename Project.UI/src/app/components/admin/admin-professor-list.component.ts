import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {ProfessorService} from '../professor/shared';
import {Router} from '@angular/router';
import {UtilityService} from '../../shared';

@Component({
    selector: 'admin-professor-list',
    templateUrl: './admin-professor-list.component.html',
    styleUrls: ['./admin-professor-list.component.less'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminProfessorListComponent implements OnInit{
    professors:any[];
    hiddenCourses:boolean[]=[]
    checkedProfessors:boolean[]=[]
    loading=true;
    loadingMessage="Dohvaćanje liste profesora...";
    sortAsc ={};    
    constructor(private professorService:ProfessorService,
    private router:Router,
    private utilityService:UtilityService){
        
    }

    async ngOnInit():Promise<void>{
        try{   
            this.professors=await this.professorService.GetAllProfessors();
            this.professors=this.utilityService.sortArray(this.professors,"lastName",true); 
            this.hiddenCourses=new Array(this.professors.length);
            this.checkedProfessors=new Array(this.professors.length);
            this.hiddenCourses.fill(true);
            this.checkedProfessors.fill(false);       
            this.loading=false;
        }
        catch(e){
            this.loadingMessage;
            this.loading=false;
        }
        
        this.sortAsc ={
            "lastName":true,
            "joinDate":true,
        };
    }

    private collapse(i){
        this.hiddenCourses[i]=!this.hiddenCourses[i];
    }
    
    private selectAll(value){
        this.checkedProfessors.fill(value);
    }

    private select(value,index){
        this.checkedProfessors[index]=value;        
    }

    public async CreateProfessor():Promise<any>{
        this.professorService.changeCourse({});        
        this.router.navigate(["/professor/create/"]);        
    }

    public async DeleteProfessor(course:any):Promise<any>{
        if (confirm("Jeste li sigurni da želite obrisati odabranog profesora?")) {                        
        try{
            this.loading=true;
            this.loadingMessage="Brisanje odabranog profesora...";
            //await this.courseService.DeleteCourse(course.courseID);
        }
        catch(e){
            this.loading=true;            
            this.loadingMessage=e;
        }
        this.ngOnInit();
    }
    }

    public async EditProfessor(course:any):Promise<any>{
        this.professorService.changeCourse(course);
        this.router.navigate(["/professor/create/"]);
    }

    public sortProfessors(key:string){
        this.hiddenCourses.fill(true);
        this.checkedProfessors.fill(false);
        this.professors = this.utilityService.sortArray(this.professors,key,this.sortAsc[key]);
        this.sortAsc[key] = !this.sortAsc[key];
    }

    public async DeleteCheckedProfessors():Promise<any>{
        if (confirm("Jeste li sigurni da želite obrisati odabrane profesore?")) {            
        this.loading=true;
        this.loadingMessage="Brisanje odabranih profesora...";
        for(var i =0;i<this.checkedProfessors.length;i++){
            if(this.checkedProfessors[i]){
                try{

                }
                catch(e){
                    this.loadingMessage=e;
                }
            }
        }
        this.ngOnInit();
    }
    }
}

