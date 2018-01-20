import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {ApplicationService} from '../application/shared';
import {UtilityService} from '../../shared';
@Component({
    selector: 'admin-apply-list',
    templateUrl: './admin-apply-list.component.html',
    styleUrls: ['./admin-apply-list.component.css'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminApplyListComponent implements OnInit{
    applications:any[];
    hiddenCourses:boolean[]=[]
    checkedApplications:boolean[]=[]
    sortAsc ={};
    selectedValue:string="accept";
    
    constructor(private applicationService:ApplicationService,
    private utilityService:UtilityService){
        
    }

    async ngOnInit():Promise<void>{
        this.applications=await this.applicationService.getAllApplications();
        this.hiddenCourses=new Array(this.applications.length);
        this.checkedApplications=new Array(this.applications.length);
        this.hiddenCourses.fill(true);
        this.checkedApplications.fill(false);

        this.sortAsc ={
            "firstName":true,
            "applyDate":true,
            "gradeAverage":true,
            "numberOfApplyHours":true,
        };
    }

    private collapse(i){
        this.hiddenCourses[i]=!this.hiddenCourses[i];
    }
    
    private selectAll(value){
        this.checkedApplications.fill(value);
    }

    private select(value,index){
        this.checkedApplications[index]=value;        
    }

    public async AcceptApply(apply){
        if(confirm("Jeste li sigurni da želite prihvatiti demonstraturu za studenta: "+apply["firstName"]+" "+ apply["lastName"])){
            apply["applyStatus"]=1;
            await this.applicationService.UpdateApplication(apply);
            this.ngOnInit();
        }

    }

    public async DeclineApply(apply){
        if(confirm("Jeste li sigurni da želite odbiti demonstraturu za studenta: "+apply["firstName"]+" "+ apply["lastName"])){
            await this.applicationService.DeleteApplication(apply["applyID"]);
            this.ngOnInit();
        }
    }

    public sortApplies(key:string){
        this.hiddenCourses.fill(true);
        this.checkedApplications.fill(false);
        this.applications = this.utilityService.sortArray(this.applications,key,this.sortAsc[key]);
        this.sortAsc[key] = !this.sortAsc[key];
    }

    private onSelect(event){
        this.selectedValue=event;
    }
    private async ApplySelected(){
        if(this.selectedValue=="accept"){
            for(var i =0;i<this.checkedApplications.length;i++){
                if(this.checkedApplications[i]){
                    this.applications[i]["applyStatus"]=1;
                    await this.applicationService.UpdateApplication(this.applications[i]);
                }
            }
        }
        else{
            for(var i =0;i<this.checkedApplications.length;i++){
                if(this.checkedApplications[i]){
                    await this.applicationService.DeleteApplication(this.applications[i]["applyID"]);
                }
            }
        }
        this.ngOnInit();
        
    }
}

