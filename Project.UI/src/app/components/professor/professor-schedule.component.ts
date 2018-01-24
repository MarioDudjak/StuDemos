import { Component, OnInit } from '@angular/core';
import { ProfessorService } from './shared/professor.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'professor-schedule',
  templateUrl: './professor-schedule.component.html',
  styleUrls: ['./professor-schedule.component.less']
})

export class ProfessorScheduleComponent implements OnInit {

  constructor(private professorService:ProfessorService) { }

  async ngOnInit() {
  }

}
