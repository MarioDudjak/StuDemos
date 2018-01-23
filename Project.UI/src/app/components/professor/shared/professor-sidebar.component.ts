import {Component, OnInit} from '@angular/core';
import { ProfessorService } from './professor.service';

@Component({
    selector : 'professor-sidebar',
    templateUrl: './professor-sidebar.component.html',
    styleUrls: ['./professor-sidebar.component.less'],
})

export class ProfessorSidebarComponent{

    constructor(private professorService:ProfessorService){}

    private demoCourses:Object;

    async ngOnInit() {
        this.demoCourses = await this.professorService.getDemoCourses();
    }

}