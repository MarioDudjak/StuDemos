import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {ApplicationService} from '../application/shared';
import {UtilityService} from '../../shared';
import {Router} from '@angular/router';

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
    loadingMessage="Dohvaćanje studentskih prijava...";
    loading=true;
    constructor(private applicationService:ApplicationService,
    private utilityService:UtilityService,
    private router:Router){
        
    }

    async ngOnInit():Promise<void>{
        
        try{
            this.applications=await this.applicationService.getAllApplications();
            this.loading=false;
        }catch(e){
            this.loadingMessage=e;
            this.loading=false;
        }
        this.applications=this.utilityService.sortArray(this.applications,"applyDate",true);
        
        this.hiddenCourses=new Array(this.applications.length);
        this.checkedApplications=new Array(this.applications.length);
        this.hiddenCourses.fill(true);
        this.checkedApplications.fill(false);

        this.sortAsc ={
            "lastName":true,
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
        this.applicationService.changeCourse(apply);
        this.router.navigate(["/apply/confirm/"]);
    
    }

    public async DeclineApply(apply){
        if(confirm("Jeste li sigurni da želite odbiti demonstraturu za studenta: "+apply["firstName"]+" "+ apply["lastName"])){
            this.loadingMessage="U tijeku odbijanje demonstrature...";
            this.loading=true;
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
            if (confirm("Jeste li sigurni da želite potvrditi odabrane prijave?")) {
                this.loadingMessage="U tijeku prihvaćenje odabranih prijava...";
                this.loading=true;
                for(var i =0;i<this.checkedApplications.length;i++){
                    if(this.checkedApplications[i]){
                        this.applications[i]["applyStatus"]=1;
                        await this.applicationService.UpdateApplication(this.applications[i]);
                    }
                }
            } 
        }
        else{
            if (confirm("Jeste li sigurni da želite ukloniti odabrane prijave?")) {  
            this.loadingMessage="U tijeku odbijanje odabranih prijava...";
            this.loading=true;              
            for(var i =0;i<this.checkedApplications.length;i++){
                if(this.checkedApplications[i]){
                    await this.applicationService.DeleteApplication(this.applications[i]["applyID"]);
                }
            }
        }
        }
        this.ngOnInit();      
    }

    private changePriority(applyIndex,selectionIndex,up){
        if(up){
            var temp= this.applications[applyIndex]["selections"][selectionIndex];
            this.applications[applyIndex]["selections"][selectionIndex] = this.applications[applyIndex]["selections"][selectionIndex-1];
            this.applications[applyIndex]["selections"][selectionIndex-1]=temp;
        }
        else{
            var temp= this.applications[applyIndex]["selections"][selectionIndex];
            this.applications[applyIndex]["selections"][selectionIndex] = this.applications[applyIndex]["selections"][selectionIndex+1];
            this.applications[applyIndex]["selections"][selectionIndex+1]=temp;
        }
    }
}

