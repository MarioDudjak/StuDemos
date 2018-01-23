import {Component,ViewEncapsulation, OnInit} from '@angular/core';
import {CourseService,Course} from '../course/shared';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {ApplicationService} from '../application/shared';

@Component({
    selector: 'admin-apply-confirm',
    templateUrl: './admin-apply-confirm.component.html',
    styleUrls: ['./admin-apply-confirm.component.less'],
    encapsulation:ViewEncapsulation.Native
})

export class AdminApplyConfirmComponent implements OnInit{
    apply:any={};
    newApply:any;
    loading = false;
    constructor(private applicationService:ApplicationService,
    private location:Location,
    private router:Router){
        
    }

    async ngOnInit():Promise<void>{
        this.applicationService.currentApply.subscribe(apply => this.newApply = apply);
    }

    public async createApply(f:NgForm):Promise<any>{
        this.loading = true;
        this.newApply["numberOfApplyHours"]=this.apply["numberOfApplyHours"];
        this.newApply["applyStatus"]=1;     
        let apply = await this.applicationService.UpdateApplication(this.newApply);
        f.resetForm();
        this.loading=false;
        this.router.navigate(["/admin/apply/list"]);        
    }

    public Cancel(){
        this.router.navigate(["/admin/apply/list"]);
    }

}

